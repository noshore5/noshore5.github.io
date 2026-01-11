#!/bin/bash
# macOS/Linux shell script to add, commit, and push all changes to origin main

# Count non-empty lines in tolkien_quotes.txt
QUOTE_COUNT=$(grep -cv '^$' tolkien_quotes.txt)

# Generate random number between 1 and QUOTE_COUNT
RAND_LINE=$((RANDOM % QUOTE_COUNT + 1))

# Get the random quote (skip empty lines)
QUOTE=$(grep -v '^$' tolkien_quotes.txt | sed -n "${RAND_LINE}p")

# Fallback if QUOTE is empty
if [ -z "$QUOTE" ]; then
  QUOTE="Auto commit"
fi

# Add all changes
git add -A
if [ $? -ne 0 ]; then
  exit 1
fi

# Commit with the random quote
git commit -m "$QUOTE"
if [ $? -ne 0 ]; then
  exit 1
fi

# Push to origin main
git push origin main
if [ $? -ne 0 ]; then
  exit 1
fi

echo "Git push complete."


