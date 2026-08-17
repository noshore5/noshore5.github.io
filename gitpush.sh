#!/bin/bash
# macOS/Linux shell script to add, commit, and push all changes to origin main.
set -e
cd "$(dirname "$0")"

# --- Clear a stale .git/index.lock, if present ------------------------------
# Git creates .git/index.lock while it's writing the staging area, then
# deletes it itself when the command finishes. If a previous git process was
# killed or interrupted before it could clean up, the lock file is left
# behind and every future git command refuses to run ("Another git process
# seems to be running..."). This only removes it if nothing is actually
# holding it open right now, so it's safe to run even if a real git process
# happens to be mid-operation.
LOCK_FILE=".git/index.lock"
if [ -f "$LOCK_FILE" ]; then
  if command -v lsof >/dev/null 2>&1 && lsof "$LOCK_FILE" >/dev/null 2>&1; then
    echo "A git process currently has $LOCK_FILE open — not touching it. Wait for it to finish and re-run."
    exit 1
  else
    echo "Found a stale $LOCK_FILE (no process is using it) — removing it."
    rm -f "$LOCK_FILE"
  fi
fi

# --- Pick a commit message ---------------------------------------------------
QUOTE_COUNT=$(grep -cv '^$' tolkien_quotes.txt)
RAND_LINE=$((RANDOM % QUOTE_COUNT + 1))
QUOTE=$(grep -v '^$' tolkien_quotes.txt | sed -n "${RAND_LINE}p")
if [ -z "$QUOTE" ]; then
  QUOTE="Auto commit"
fi

# --- Add, commit, push -------------------------------------------------------
git add -A

if git diff --cached --quiet; then
  echo "Nothing staged to commit — working tree already matches the last commit."
  exit 0
fi

git commit -m "$QUOTE"
git push origin main

echo "Git push complete."
