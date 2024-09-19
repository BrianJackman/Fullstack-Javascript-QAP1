// CLI Password generator
// Brian Jackman
// 2021-09-19

// Generate a password with the specified length and character sets
function generatePassword(
  length,
  includeNumbers,
  includeUppercase,
  includeSymbols
) {
  let charset = "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) charset += "0123456789";
  if (includeUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeSymbols) charset += "!@#$%^&*()_+[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// Argument parser and set default values if not specified
const args = process.argv.slice(2);
let length = 8;
let includeNumbers = false;
let includeUppercase = false;
let includeSymbols = false;

// Function for help messages
function displayHelp() {
  console.log("Usage: node index.js [options]");
  console.log("");
  console.log("Options:");
  console.log(
    "  --length, -l <number>  specify the length of the password (default: 8)"
  );
  console.log("  --numbers, -n          include numbers in the password");
  console.log(
    "  --uppercase, -u        include uppercase letters in the password"
  );
  console.log("  --symbols, -s          include symbols in the password");
  console.log("  --help, -h             display help for command");
  console.log("");
  console.log("Examples:");
  console.log("  $ node index.js --length 12 --numbers --uppercase --symbols");
  console.log("  $ node index.js -l 10 -n -u -s");
}

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--help" || arg === "-h") {
    displayHelp();
    process.exit(0);
  } else if (arg === "--length" || arg === "-l") {
    const nextArg = args[i + 1];
    if (nextArg && !isNaN(parseInt(nextArg, 10))) {
      length = parseInt(nextArg, 10);
      i++; // Skip next argument as it is the length value
    } else {
      console.error("Error: Length must be a positive number.");
      process.exit(1);
    }
  } else if (arg === "--numbers" || arg === "-n") {
    includeNumbers = true;
  } else if (arg === "--uppercase" || arg === "-u") {
    includeUppercase = true;
  } else if (arg === "--symbols" || arg === "-s") {
    includeSymbols = true;
  }
}

// Validate length
if (isNaN(length) || length <= 0) {
  console.error("Error: Length must be a positive number.");
  process.exit(1);
}

// Generate and display the password
const password = generatePassword(
  length,
  includeNumbers,
  includeUppercase,
  includeSymbols
);
console.log(`Generated password: ${password}`);
