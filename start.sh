#!/bin/bash

gnome-terminal --window-with-profile=003 -e command

echo "Opening BACK.sublime-project"
subl --project BACK.sublime-project

echo "Opening FRONT.sublime-project"
subl --project FRONT.sublime-project

echo "Opening NOTES.sublime-project"
subl --project NOTES.sublime-project

# echo "subl --project BACK"
# echo "subl --project NotesProject"