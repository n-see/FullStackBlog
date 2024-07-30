<!-- Goal is to create a full stack web app for our Blog Site -->
<!-- Back end will be done in dotnet 8, web api, ef core, SQL server -->
<!-- Front end will be done in React with JavaScript 
Deploy with Azure Static web apps -->


<!-- Create an API for Blog, This must handle all CRUD functions -->

<!-- 
CRUD
Create
Read
Update
Delete
 -->

 <!-- In this app the user should be able to login so we need login page -->

 <!-- Create account Page -->
 <!-- Blog view post page of published items -->
 <!-- Dashboard page(this is the profile page will edit delete, publish and unpublish your blog post) -->

 <!-- SQL Server from azure for our data base -->

 <!-- Folder Structure -->

 <!-- Controllers//Folder
        UserController: This will handle all our user interactions
        all our endpoints will be in this controller for users
  -->

  <!-- LogIn//endpoint
        
        Add User //endpoint
        update user// endpoint
        delete user//Endpoint
   -->




   <!-- BlogController

        Add Blog Items// endpoint C
        GetAllBlogItems //endpoint R
        GetAllBlogItemsByCategory//endpoint
        GetAllBlogItemsByTags//endpoint
        GetAllBlogItemsByDate//endpoint
        UpdateBlogItems//Endpoints U
        DeleteBlogItems// Endpoint D
    -->
<!-------------------------------------Models---------------------------- -->

<!-- Models Folder -->

<!-- UserModel
    
        Id int
        username string
        salt string
        hash string
 -->

 <!-- BlogItemModel

        id int
        UserId int
        PublisherName string
        Title string
        Image string
        Description string
        date string
        category string
        isPublished bool
        isDeleted bool
 -->

 <!-- Items that will be saved to our database are above -->

 <!-- LoginModel
    Username string
    Password string
        CreateAccountModel
        Id int
        Username string
        password string
        
        Password model
        Salt string
        Hash string
  -->

  <!-- service//Folder
  
  userService//file
    GetUserByUsername
    Login
    AddUser
    DeleteUser
BlogItemsService
    AddBlogItems
    GetAllBlogItemsByCategory//function(method)
    GetAllBlogItemsByTag
    GetAllBlogItemsByDate
    UpdateBlogItems
    DeleteBlogItems
    GetUserById
   -->

<!-- PasswordServices//File

    Hash password

    Very Hash password
    
 -->
