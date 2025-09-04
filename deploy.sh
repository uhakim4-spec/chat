#!/bin/bash

# Deployment script for pushing updates to Git remote and triggering Vercel deploy

BRANCH="main"   # change to master if your repo uses master

# 1. Stage all changes
git add .

# 2. Commit with custom or default message
if [ -z "$1" ]
then
  COMMIT_MSG="Update: latest changes"
else
  COMMIT_MSG=$1
fi

git commit -m "$COMMIT_MSG"

# 3. Push to remote branch
git push origin $BRANCH

echo "✅ Code pushed to $BRANCH branch!"
echo "🚀 If your repo is connected to Vercel, deployment will start automatically."

