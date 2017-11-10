# Benefits Calculator

# Demo Challenge App Benefits Calculator

### Downloading, Installing and Running

1. Download or clone this repository.
2. Navigate to /benefits_calc/src/PBC_WS/ rebuild the solution and run
3. Navigate to /benefits_calc/src/pbc-client from the command line
4. run the command `npm install` to update all dependencies in the project
5. run the command `npm start` to start the application

### Screenshot 1
![Screen Shot of App](https://raw.githubusercontent.com/fernandozamoraj/benefits_calc/master/docs/screenshot1.PNG)

### Screenshot 2
![Screen Shot of App](https://raw.githubusercontent.com/fernandozamoraj/benefits_calc/master/docs/screenshot3.PNG)

### Screenshot 3
![Screen Shot of App](https://raw.githubusercontent.com/fernandozamoraj/benefits_calc/master/docs/screenshot4.PNG)

### Running the application

The client application runs on localhost:3000.
The application allows you to perform two functions
   * Add a member
   * Run the calculations
The MVC .Net solution should run on port 3010.  If it doesn't, then you will need to adjust
the proxy setting the package.json of the client application.

###### Validation requirements
   * At a minimum the application requires you to enter an employee member in order to
     perform the calculations


# The benefits calculator consists of two projects.

### The Benefits Calculator Back End

The first project is the back end, an MVC .NET Web API project. The project
is located in the folder /benefits_calc/src/PBC_WS/.  You can open the project
in Visual Studio 2015. The purpose of this project is to run the calculations on
the back end.

The back end also simulates saving each family member entered into the system.
The client application will still run even when the back end is down. However,
you will get a notification message box telling that communication with the 
back end failed and the program will run the calculations locally.   

There are two main ideas behind running the calculations on the back end. First 
off, calculations sometimes may contain proprietary algorithms.  That's not necessarily
the case in this demo. The second idea is that it allows me to demonstrate the
architecture for a MVC .net project.

The other idea with simulating saving to the back end is to demonstrate how
to round trip to the back end.

### Back End Architecture

The architecture behind the back end promotes an application that separates concerns.
Some of the concepts are rooted in the ideas originated by Eric Evans in his Book
Domain-Driven Design.  The architecture divides objects into different categories such
as Services, Entities, Aggregates, Repositories and Data Transfer Objects.

This approach helps further promote SOLID principles such as 

* Single Responsibility, 
* Open Closed Principle
* Liskov Substitution Principle,
* Interface Segregation,
* Dependency Inversion

These principles originate from patterns that provide better reliability in terms of better 
cohesion and reduced coupling.  This approach makes the components more reliable because
they are better suited for testing, thereby making the software more reliable and adaptable
to change. Software is easy to change.  Software changes without side effects can be 
very difficult if the software is not well written up front.

The approach also complements clean code concepts, such as good names for code elements 
(e.g. variables, classes, object instances, methods, functions, etc).

Writing code under these principles and guidelines, makes the software more testable.  One
of the big benefits of using a Test Driven Development approach is that it forces the code
to have better structure. 

# Visual Studio Project Structure

This project is broken down into several projects.  For a project this small this may 
be overkill.  However, in a real world project the number of code elements would grow
significantly and then it would become extremelly important to have the projects neatly
organized into appropriate collections of assemblies, folders and functional sub-systems.

### The Main Application

The main application is the PBC project.  This application consists of those items
that are necessary for the application to function.  The controllers MVC and Web Api controllers
can be found in this project.

In a normal MVC project some elements are required to live in the main application such
as the scripts, assets, controllers and views.  Some of this has to do with the opiniated
approach that Microsoft has taken in their implemenation of MVC .net.  Any other objects
that are not required may be better suited in a appropriate libraries to keep the pieces
modular and allow better re-use.

Another project in the solution is the PBC.Services.  The services are not intra-services
components. Rather they are plain C# classes that provide some sort of service such as 
transforming some input into some form of output.  This allows the services to be reused.  
It also allows separation between state computations.

Typically services are bound to some interface.  This makes it easier to replace the dependency
at run time.  For example a in this project the Calculator implements the ICalculator 
interface. The calculator is later utilized by the BenefitsApiController.  However the
controller only depends on the abstraction, ICalculator.  This allows the controller
to depend on the abstraction and not the concrete implementation.

This approach goes hand in hand with the Open/Closed principle because it allows changes to be made
to the calculator or even replace the calculator without affecting the controller. Thus,
it allows the controller to be open for extension but closed for modification.

The PBC.Models project promotes separating the domain POCOs into cohesive units.  This 
cohesiveness promotes the idea of single responsiblity. Most models' responsibility is
to group together a collection of data into a larger entity.  This is the concept behind
the CalculationResults.  Notice that, although most models may appear anemic, it is OK
to give them behavior. This is the case with the CalculationResults' attribute AdjustedPeriodAmount.
Is a small for of behavior. However, the object is still lean and much easier to read and grasp.

The PBC.Repos has litte responsiblity in this project.  That is mostly because I decided
to create a separate application for the GUI and also because the API controller does
not make any calls to a back end database.  This is another example of a service
type structure.  However, since data access is such a common and distinct operation in 
a typical line of business application, they deserve their own assembly.

### The Benefits Calculator Front End

The second project is a react application.  That project is located in
/benefits_calc/src/pbc-client/. Since this project is a node application, you
will need to install node in order to update it and run it.

The react application has a dependency on the MVC .Net project. 

The application consists of several GUI components.

These components are

```
App
  |----BenefitsApp
       |----AddMember
       |    |----MembersList
       |         |----Member
       |----CalculationResults 
```

The application also contains some utility source files to provide support for the components

`app_config.js` - Holds settings to to assis the calculator such as the pay, discount amount, etc.
`calculator.js` - This is the calculator on the client side. It serves the purpose of computing the
                caclculations when connection to the Web Services fails.
`random_image.js` - Generates a random URL to a randomuser.me image.  
`round_money.js` - rounds numbers to the specified decimal point
`validate_member.js` - This file contains logic to provide validation when adding members from the GUI.

The application is intuitive enough in my opinion and therefore it should be easy enough to run.

# Languages, Frameworks and Third Party Libraries in this project

#### C# and .Net
* C#
* [Structure Map](http://structuremap.github.io/) - For dependency injection
* [MVC .Net](https://www.asp.net/mvc) - For backed business logic
* [ASP .Net Wep API 2.0](https://docs.microsoft.com/en-us/aspnet/web-api/overview/getting-started-with-aspnet-web-api/tutorial-your-first-web-api) - For the back end web services
* Visual Studio Unit Test Framewor - For unit testing the back end

#### Client - Front End
* HTML
* CSS
* [Gridiculous](https://github.com/cbavota/Gridiculous) for laying out grids to fill the gaps by the other Styling frameworks
* JavaScript
* [ReactJS](https://reactjs.org/) - Framework for GUI components
* [Material-ui](http://www.material-ui.com) - CSS Framework as React Components specificly for React 
* [axios](https://www.npmjs.com/package/axios) - For AJAX calls
* [uuid js](https://www.npmjs.com/package/uuid) - For Generating UUIDs

