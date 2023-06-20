

# Company Database

## Description
Glavni cilj ove web aplikacije je evidencija statusa suradnja kompanija na projektima i jednostavan uvid od strane ovlaštenih korisnika.

## Visuals
*Depending on what you are making, it can be a good idea to include screenshots or even a video (you'll frequently see GIFs rather than actual videos). Tools like ttygif can help, but check out Asciinema for a more sophisticated method.*

## License
*For open source projects, say how it is licensed.*

## Project status
*If you have run out of energy or time for your project, put a note at the top of the README saying that development has slowed down or stopped completely. Someone may choose to fork your project or volunteer to step in as a maintainer or owner, allowing your project to keep going. You can also make an explicit request for maintainers.*

## Dodatne upute za rad s git

### Postupak za rad na kodu i dokumentaciji.

#### Ažuriranje lokalnog repozitorija

Prebaci se na granu develop ili devdoc:

1. `git checkout develop/devdoc`

Povuci promjene s udaljenog repozitorija na svoj lokalni repozitorij:

2. `git pull`

#### Rad na promjenama

U lokalnom repozitoriju stvori novu vlastitu granu za rad:

3. `git checkout -b develop/devdoc-feature/bugfix-nazivFeaturea/nazivBugFixa`

*Unesi izmjene...*  
Dodaj sve izmjenjene datoteke u međupodručje:

4. `git add .`

Potvrdi sve promjene u međupodručju s opisnom porukom:

5. `git commit -m "Opisna poruka sto se promijenilo."`

#### Ponovno ažuriranje lokalnog repozitorija

Prebaci se na granu develop ili devdoc:

6. `git checkout develop/devdoc`

Povuci promjene s remote repozitorija na svoj lokalni repozitorij:

7. `git pull`

#### Spajanje promjena na vlastitoj grani

Prebaci se na vlastitu granu za rad:

8. `git checkout develop/devdoc-feature/bugfix-nazivFeaturea/nazivBugFixa`

Spoji promjene iz glavne grane (develop ili devdoc) na vlastitu granu:

9. `git merge develop/devdoc`

*Popravi konfilkte (ako postoje) i provjeri radi li sve...*
* *Više informacija o konfliktima na [linku](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging) pod naslovom Basic Merge Conflicts.*

#### Spajanje promjena na glavnoj grani

Prebaci se na granu develop ili devdoc:

10.  `git checkout develop/devdoc`

Spoji promjene iz vlastite grane na glavnu granu (develop ili devdoc):

11.  `git merge develop/devdoc-feature/bugfix-nazivFeaturea/nazivBugFixa`

Izbriši vlastitu granu:

12.  `git branch -d develop/devdoc-feature/bugfix-nazivFeaturea/nazivBugFixa`

#### Ažuriranje udaljenog repozitorija

Spremi promjene na udaljeni repozitorij:

13.  `git push`

### Dodatne korisne naredbe

Prikaz svih grana na lokalnom repozitoriju:

`git branch -a`

Ažuriranje popisa grana lokalnog repozitorija s popisom grana udaljenog repozitorija:

`git remote update origin --prune`

ili

```
git branch -r | grep -v '\->' | sed "s,\x1B\[[0-9;]*[a-zA-Z],,g" | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
git fetch --all
git pull --all
```

* *Više informacija na linkovima: [1](https://stackoverflow.com/questions/36358265/when-does-git-refresh-the-list-of-remote-branches), [2](https://stackoverflow.com/questions/10312521/how-do-i-fetch-all-git-branches) i [3](https://stackoverflow.com/questions/17712468/what-is-the-difference-between-git-remote-update-git-fetch-and-git-pull).*

Brisanje grane na udaljenom repozitoriju:

`git push -d origin nazivGraneZaBrisanje`

* *Više informacija o brisanju grana na [linku](https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-locally-and-remotely) prvi odgovor.*