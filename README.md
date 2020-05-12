# The Plea Justice Project README
The Plea Justice Project offers a simulation of plea bargaining processes, which has been made using Adobe Animate and JavaScript. This animated software was created as a potential alternative to existing research paradigms (i.e., vignettes and high-stakes deceptions) used to study plea decision-making.

## Examples
If you want to take the simulation for a test run, [here is a link to a demo](https://umasslowell.co1.qualtrics.com/jfe/form/SV_25DlciTSNf0F5nn). The link will bring you to a landing page where you will be asked to give informed consent: there will be two text-entry fields. The first will ask you to enter your first name to be used in the simulation; the second will request a UML student email address (because the primary study for which the simulation was used recruited students from UMass Lowell). Entering the string “[any characters]@student.uml.edu” in this text-entry box will allow you to proceed.

### Features

**Avatar Customization**

<p align="center">
<img src="https://i.imgur.com/Bz1I0RW.png" align="center" alt="Avatar pointing to the salesclerk an item they want in an eyeglass store" width="50%">
</p>

Using this avatar creation interface, users are allowed to customize their own avatar to be used in the simulation with predefined assets. Controls are provided to select figure types, eye types, or hair styles, as well as selecting a color for the hair, eyes, skin, and shirt. 

**Animation & Dialogue**
 
| <img src="https://i.imgur.com/kqrNt0J.png" alt="Avatar driving a car" width="100%"> | <img src="https://i.imgur.com/1PZUMAG.png" alt="Avatar pointing to the salesclerk an item they want in an eyeglass store" width="100%"> | 
|--|--|

The user is presented with one of two unique scenarios featuring the customized avatar the user created -- one with the avatar driving and the other with the avatar browsing for a pair of glasses at the mall. These animated sequences provide context to the user as they illustrate what happens before the avatar receives a summons and is ordered to appear in court.

| <img src="https://i.imgur.com/XA79o3U.png" alt="judge reminding the reader their rights" width="100%"> | <img src="https://i.imgur.com/lfsw1Wo.png" alt="district attorney reminding the outcomes if pleading guilty" width="100%"> |
|--|--|

Both sequences lead up to the avatar being summoned to court and asked to either accept a plea offer and plead guilty, or go to trial. The user navigates the simulation by clicking the “>>” button as it appears (when the dialogue has stopped); as the simulation progresses, they learn more about the incident surrounding their avatar (e.g., whether they are innocent or guilty of the crime to which they are accused).

**Modifiable Values & Recording Responses in Qualtrics**

<p align="center">
<img src="https://i.imgur.com/2q3xVDW.png" align="center" alt="Avatar pointing to the salesclerk an item they want in an eyeglass store" width="50%">
</p>

The simulation concludes by offering the user the option to either plead guilty and accept the plea offer or reject it. The option the user selects, alongside other variables scattered throughout the simulation, are then saved and passed as parameters into Qualtrics. Although it is separate from this software, the platform contains features to incorporate conditional logic in the survey flow based on variables expressed in the simulation (e.g. *guilt status*, plea offer *type*, sentencing *duration*). 

### Installing
> **Note**: The current implementation of the project has the source and asset files deployed onto a server, which allows those with server access to run the simulation without downloading any of the files. Instructions on how to set up a remote web server for this project will be coming soon. 

To run the simulation on your own local machine, download the source code by cloning the GitHub repository through Command Line with,

    git clone https://github.com/Plea-Justice/pleabargain-simulation.git

or download and extract the zip file on the desktop site. Once the files are on your machine, create a local web server by way of navigating to the folder of the project in the terminal and typing either `python3 -m http.server` or `http-server`. 

* To download Python,  [visit the Python homepage](https://www.python.org/) and download the release that corresponds to your operating system.
* To download http-server, [here is the link to the http-server README](https://www.npmjs.com/package/http-server) on the NPM webpage. 

## Contribution 
Interested in contributing to the development of this project or collaborating on related research? You can [contact the Principal Investigator here](https://mikowilford.wixsite.com/website-1) if you have any questions, comments, concerns or inquiries regarding the project or the related research. 

Before contributing to the software, take a look at **how the project is made** or the **source code** and see if there is an area in need of improvements.


### License 
This project is licensed using [GNU GPLv3](https://opensource.org/licenses/GPL-3.0).

## Related Articles
* 06/04/2018 - [To Plead or Not to Plead](https://www.uml.edu/news/stories/2018/pleabargains.aspx): Psychology and Art Faculty Team Up with Students on Plea Bargain Research Tool
* 02/26/2019 - [Why Do Innocent People Plead Guilty?](https://www.uml.edu/news/press-releases/2019/wilfordresearch022619.aspx): UMass Lowell Researcher Wins NSF Grant to Find Answers

[imgur links]: <> (swap out imgur links of pictures to pictures in img directory)
["Installing; Note: The current implementation"]: <> (be sure to update the method for implementing it on a remote server)
["Recording responses in Qualtrics"]: <> (add a link documentation on data cleaner)
["how the project is made"]: <> (software architecture document)
["source code"]: <> (link to src code)
