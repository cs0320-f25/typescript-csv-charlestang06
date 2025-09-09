# Sprint 1: TypeScript CSV

### Task C: Proposing Enhancement

- #### Step 1: Brainstorm on your own.'

Using this CSV parser, I found that the inability to support commas within quoted fields and the inability to strip quotes from fields is extremely frusturating. I would also want the CSV specification to also include escaped quotes as well. Furthermore, as a developer, I would like to see using custom delimeters for the CSV parser.

The CSV parser could also validate the CSV such that the number of entries per row is always guaranteed to be the same. There could be extended options to support custom header options (ignore headers) and converting data into structured objects for typing purposes Furthermore, the CSV parser could throw errors more errors if datatypes are not consistent with expected types.

- #### Step 2: Use an LLM to help expand your perspective.

> The student has identified several critical limitations in the current CSV parser implementation. Their brainstorming highlights functionality issues including the inability to properly handle quoted fields containing commas, failure to strip quotes from output, lack of escaped quote support, and missing validation for consistent row lengths. They also note extensibility concerns such as the need for custom delimiters, header handling options, and conversion capabilities to transform raw CSV data into properly typed structured objects. These limitations significantly reduce the parser's reliability and usefulness in real-world applications where CSV files often contain these complex formatting elements.

- #### Step 3: use an LLM to help expand your perspective.

  Include a list of the top 4 enhancements or edge cases you think are most valuable to explore in the next week’s sprint. Label them clearly by category (extensibility vs. functionality), and include whether they came from you, the LLM, or both. Describe these using the User Story format—see below for a definition.

  #### Functionality

  **User Story 1**
  As a user, I want the CSV parser to correctly handle quoted fields that contain commas, so that I can accurately parse CSV files without data corruption. (Identified by both student and LLM)

  Acceptance criteria:

  - If a field contains commas or is enclosed in quotes, the parser should treat the entire quoted string as a single field.
  - If a field contains escaped quotes, the parser should correctly interpret them as part of the field value.

  **User Story 2**
  As a user, I want the CSV parser to strip quotes from fields, so that I can work with clean data without extra formatting characters. (Identified by both student and LLM)

  Acceptance criteria:

  - The parser should remove surrounding quotes from fields in the output if they are present.
  - If no quotes are present, the field should remain unchanged.

  #### Extensibility

  **User Story 3**
  As a developer, I want the CSV parser to support custom delimiters, so that I can work with non-standard CSV formats. (Identified by both student and LLM)

  Acceptance criteria:

  - I should be able to specify a custom delimiter character when calling the parser.
  - The parser should correctly split fields based on the specified delimiter.

  **User Story 4**
  As a user, I want the CSV parser to validate that all rows have the same number of fields, so that I can ensure data consistency and integrity. (Identified by both student and LLM)

  Acceptance criteria:

  - If I pass in an invalid CSV file (different number of fields per row), the parser should throw an error.
  - If I pass in a valid CSV (same number of fields per row), the parser should return the parsed data without errors.

  Include your notes from above: what were your initial ideas, what did the LLM suggest, and how did the results differ by prompt? What resonated with you, and what didn’t? (3-5 sentences.)

  My initial ideas were grounded in mostly functionality issues, but the LLM helped me see that extensibility issues were just as important. The LLM also helped me reflect upon my ideas and turn them into actionable user stories. Lastly, when I changed the prompt, the LLM was able to provide more detailed reasons for why each issue was important.

### Reflection

1. Correctness
   What makes a CSV parser “correct”? We're not asking for additional input-output pairs here, but fairly precise, natural-language descriptions. Put another way, what kinds of general properties should your tests be checking about your CSV parser?

- A correct CSV parser shuold accurately handle any and all-types of comma separated value data. This includes handling edge cases such as commas within quoted fields, escaped quotes, and escaped characters.
- A correct CSV parser should also be able to handle inconsistent CSV files and throw errors when necessary.
- A correct CSV parser should finally be able to convert CSV data into structured objects / structured lists where rows are correctly separated as intended.

1. Random, On-Demand Generation
   Suppose we gave you a function that randomly produced CSV data on demand. You could then call this class from your testing code. How might you use this source of random data to expand the power of your testing?

   - I could use this random data generator to be able to iteratively find edge case scenarios that I may not have thought of.
   - If my CSV parser runs into some error, I could use that test case to further refine the parser.
   - Furthermore, I could also use the random data generator as a sanity smoke/pre-commit test to ensure that my parser is working as intended.

2. Overall experience, Bugs encountered and resolved
   In what ways did this sprint differ from prior programming assignments you’ve done? Did anything surprise you? Did you encounter any bugs during your work on this sprint? If yes, what were they and how did you fix them? If not, how do you think that you managed to avoid them?

   - This sprint was different because it was a lot more open-ended than previous assignments. This made me have to think more critically about user stories and designing for the purpose of the client.
   - Furthermore, I encountered some bugs when working with Zod, specifically what types to implement and where to put them.
   - I fixed them with help from the Zod helper documentation on the CS320 website and also by asking Copilot what is the standard practice for generic typing in TypeScript.

### Design Choices

### 1340 Supplement

- #### 1. Correctness

- #### 2. Random, On-Demand Generation

- #### 3. Overall experience, Bugs encountered and resolved

#### Errors/Bugs:

#### Tests:

#### How To…

#### Team members and contributions (include cs logins):

#### Collaborators (cslogins of anyone you worked with on this project and/or generative AI):

#### Total estimated time it took to complete project:

#### Link to GitHub Repo:
