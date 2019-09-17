#!/usr/bin/env bash
echo
echo -e "\e[33mStarting Scene Publishing\e[m\n"
echo -e "\e[32m#######################################################\e[m"
echo "Bash Version: "$BASH_VERSION
echo -e "Generating avatar feature combination files REQUIRES \e[31mat least Bash 4\e[m"
echo "(because the lowercasing of 'figure' is done in bash 4 syntax)"
echo -e "\e[32m#######################################################\e[m\n"

echo -e "\e[33m_________________________________________________________\e[m\n"
echo -e "\e[33mrunning palettize.sh\e[m\n"
source palettize.sh $1

echo -e "\e[33m_________________________________________________________\e[m\n"
echo -e "\e[33mprepare-avatar-feature-toggling.sh\e[m\n"
source prepare-avatar-feature-toggling.sh $1

#: <<'END'
echo -e "\e[33m_________________________________________________________\e[m\n"
echo -e "\e[33mrunning add-lib.sh\e[m\n"
source add-lib.sh $1
#END
echo
echo -e "\e[33mEnd of Scene Publishing completed\e[m\n"
