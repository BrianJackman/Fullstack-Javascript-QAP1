// Generate a password of lowercase letters with the specified length
function generatePassword(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

// argument parser and set default length if not specified
const args = process.argv.slice(2);
let length = 8;

// Function  for help messages
function displayHelp() {
  console.log("Usage: node index.js [options]");
  console.log("");
  console.log("Options:");
  console.log(
    "  --length, -l <number>  specify the length of the password (default: 8)"
  );
  console.log("  --help, -h             display help for command");
  console.log("");
  console.log("Examples:");
  console.log("  $ node index.js --length 12");
  console.log("  $ node index.js -l 10");
}

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
  }
}

// Validate length
if (isNaN(length) || length <= 0) {
  console.error("Error: Length must be a positive number.");
  process.exit(1);
}

// Generate and display the password
const password = generatePassword(length);
console.log(`Generated password: ${password}`);
