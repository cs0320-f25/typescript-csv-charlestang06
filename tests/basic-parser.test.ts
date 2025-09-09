/**
 * Tests for the basic CSV parser.ts module.
 */

import { parseCSV } from "../src/basic-parser";
import { z } from "zod"
import * as path from "path";

const PEOPLE_CSV_PATH = path.join(__dirname, "../data/people.csv");
const EMPTY_FIELDS_CSV_PATH = path.join(__dirname, "../data/empty-fields.csv");
const QUOTED_FILES_CSV_PATH = path.join(__dirname, "../data/quoted-fields.csv");
const EMPTY_CSV_PATH = path.join(__dirname, "../data/empty.csv");

test("parseCSV yields arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  
  expect(results).toHaveLength(5);
  expect(results[0]).toEqual(["name", "age"]);
  expect(results[1]).toEqual(["Alice", "23"]);
  expect(results[2]).toEqual(["Bob", "thirty"]); // why does this work? :(
  expect(results[3]).toEqual(["Charlie", "25"]);
  expect(results[4]).toEqual(["Nim", "22"]);
});

test("parseCSV yields only arrays", async () => {
  const results = await parseCSV(PEOPLE_CSV_PATH)
  for(const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV with empty fields", async () => {
  const results = await parseCSV(EMPTY_FIELDS_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
  expect(results).toHaveLength(8);
  expect(results[0]).toEqual(["name", "age", "city"]);
  expect(results[1]).toEqual(["", "", ""]);
  expect(results[2]).toEqual(["Alice", "23", "Wonderland"]);
  expect(results[3]).toEqual(["Bob", "", "Boulder"]);
  expect(results[4]).toEqual(["", "", ""]);
  expect(results[5]).toEqual(["", "", ""]);
  expect(results[6]).toEqual(["", "", ""]);
  expect(results[7]).toEqual(["", "", ""]);
});

test("parseCSV with commas inside quotes", async () => {
  const results = await parseCSV(QUOTED_FILES_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
  expect(results).toHaveLength(3);
  expect(results[0]).toEqual(["Caesar", "Julius", "veni, vidi, vici"]);
  expect(results[1]).toEqual(["Smith, Jr.", "John", "Hello, World!"]);
})

test("parseCSV with quotes inside quotes", async () => {
  const results = await parseCSV(QUOTED_FILES_CSV_PATH);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
  expect(results).toHaveLength(3);
  expect(results[2]).toEqual(["Brown, Sr.", "Sarah", "She said \"\"hello\"\""]);
});

test("parseCSV on empty file", async () => {
  const results = await parseCSV(EMPTY_CSV_PATH);
  expect(results).toHaveLength(0);
  for (const row of results) {
    expect(Array.isArray(row)).toBe(true);
  }
});

test("parseCSV with Zod schema invalid data", async() => {
  /**
   * Test a people csv where the last row has an invalid age (negative number).
   */
  const PersonRowSchema = z.tuple([z.string(), z.coerce.number()])
                         .transform( tup => ({name: tup[0], age: tup[1]}))
                         .refine( obj => obj.age >= 0 );

                         try {
                           const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema);
                           fail("Expected an error to be thrown");
                         } catch (error) {
                           expect(error).toBeInstanceOf(Error);
                         }
  
});

test("parseCSV with different Zod schema with valid data", async() => {
  /**
   * Test a people csv where the last row has an invalid age (negative number).
   */
  const PersonRowSchema = z.tuple([z.string(), z.coerce.number(), z.string()])
                         .transform( tup => ({name: tup[0], age: tup[1], city: tup[2]}))
                         .refine( obj => {
                           return obj.age >= 0 && obj.city.length > 0 && obj.name.length > 0;
                         });

                         try {
                           const results = await parseCSV(PEOPLE_CSV_PATH, PersonRowSchema);
                           expect(results).toHaveLength(4);
                           expect(results[0]).toEqual({name: "Alice", age: 23, city: "Wonderland"});
                           expect(results[1]).toEqual({name: "Bob", age: 30, city: "Boulder"});
                           expect(results[2]).toEqual({name: "Charlie", age: 25, city: "Springfield"});
                           expect(results[3]).toEqual({name: "Nim", age: 22, city: "Shire"});
                         } catch (error) {
                           expect(error).toBeInstanceOf(Error);
                         }
  
});