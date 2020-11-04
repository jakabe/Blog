
import java.util.*; 
import java.io.FileWriter;   // Import the FileWriter class
import java.util.Scanner;


import java.io.File;  // Import the File class
import java.io.IOException;  // Import the IOException class to handle errors


public class makePost {

   /* This is my first java program.
    * This will print 'Hello World' as the output
    */

   public static void main(String []args) {
      System.out.println("\n Hello World \n"); // prints Hello World

      Scanner keyboard = new Scanner(System.in);
      
      
      String newFolderName = getFolderName();

      System.out.println("The new folder name is "+newFolderName);
      
      String newFileName = getFileName();
      
      System.out.println("Folder ["+newFolderName+"]/["+newFileName+"] will now be created");
      
      String newDir = makeDirectoryWithFolderName(newFolderName);
      String file_and_Dir = makeFileWithFileName(newFileName,newDir);
     
      writeToTheFile(file_and_Dir, newFileName);

      //UNIT TESTS
      //getFolderNameTESTMethod();



   }

   /**
    * 

    */
   public static void writeToTheFile(String file_and_Directory, String file_name){
      try {
         FileWriter myWriter = new FileWriter(file_and_Directory);
         //we need some html script in a string
         String newHtmlString="";
         newHtmlString =
         "<link rel=\"stylesheet\" media=\"screen\" href=\"https://fontlibrary.org/face/monoid\" type=\"text/css\"/>"+
         "\n<div class=\"filterDiv show\">"+
         "\n\t<article class=\"l\">" +
         "\n\t\t<a class=\"date\" date=\""+file_name+"\" id=\""+file_name+"\">"+file_name+"</a>"+
         "\n\n\n"+
         "\n\t\t<div class=\"sig\">-J</div>"+
         "\n\t</article>"+
         "\n</div>";




         myWriter.write(newHtmlString);
         myWriter.close();
         System.out.println("Successfully wrote to the file.");
      } catch (IOException e) {
         System.out.println("An error occurred.");
         e.printStackTrace();
      }
      
   }
   /**Makes directory and returns the string
    * 
    * @param fn
    */
   public static String makeDirectoryWithFolderName(String fn){
      //get current directory 
      System.out.println("Working Directory = " + System.getProperty("user.dir"));
      String wd = System.getProperty("user.dir");
      //make new sub directory
      System.out.println("New Directory will be "+wd+"\\posts\\"+fn);
      String fd = wd+"\\posts\\"+fn;
      //check for directory
      File f = new File(fd);
      if (f.exists() && f.isDirectory()) {
         System.out.println("Directory aleady exists!");
      } else 
      {
         //System.out.println("Directory doesn't exist.  ");
         //make directory
         File theDir = new File(fd);
         if (!theDir.exists()){
            theDir.mkdirs();
         }
      }

      
      return fd;
   }

   /**
    * 

    */
   public static String makeFileWithFileName(String fn,String nd){
      
      try {
         File myObj = new File(nd+"\\"+fn+".html");
         if (myObj.createNewFile()) {
           System.out.println("File created: " + myObj.getName());
         } else {
           System.out.println("File already exists.");
         }
       } catch (IOException e) {
         System.out.println("An error occurred.");
         e.printStackTrace();
       }

      return nd+"\\"+fn+".html";

   }


   /**
    * 
    */
   public static void getFolderNameTESTMethod(){
      String folderNameArray[] = new String[] { 
         "Toyota", "Mercedes", "BMW", "Volkswagen", "Skoda", 
         "Apple",  "Banana", "Carrot", "Dill", "EggPlant",
         "Abe", "Ben", "Carl", "Dan", "Earl", 
         "Folder_0","Folder_1","Folder_2","Folder_3","Folder_4",
         "newFolder_0","newFolder_1","newFolder_2","newFolder_3","newFolder_4",
         };

      
         // create a new ArrayList 
         List<String> arrlist = new ArrayList<>(); 
         // Add the new elements
         for(int i =0 ; i < folderNameArray.length ; i++){
            System.out.println("Testing ["+folderNameArray[i]+"]");
            arrlist.add( getFolderNameTEST(folderNameArray[i])); 

            
         }

         // Convert the Arraylist to array 
         String[] arr = new String[]{};
         arr = arrlist.toArray(arr); 

      
      for(int i =0 ; i < arr.length ; i++){
         if(arr[i].equals(folderNameArray[i])){

         }  else {
            System.out.println("unit test failed");
            break;
         }

         
      }


      
   }

   /**getFolderNameTEST
   *gets folder name from console input
   */
   public static String getFolderNameTEST(String kbd)
   {
      //Scanner kbd = new Scanner(System.in);
      String folderName;

      do
      {
         System.out.println("please enter a folder name");
         //folderName = kbd.next();
         folderName = kbd;
         System.out.println("\n\n You typed: \""+folderName+"\"\n");
         // if( getValidInput() ){
         //    return folderName;
         // } else {
         //    System.out.println("Okay... Lets try again.");
         // }

         //skip the yes no for testing purposes
         return folderName;
      }while(true);

   }


   /**getFolderName
   *gets folder name from console input
   */
   public static String getFolderName()
   {
      Scanner kbd = new Scanner(System.in);
      String folderName;
 
      do
      {
         System.out.println("please enter a folder name");
         folderName = kbd.next();
         System.out.println("\n\n You typed: \""+folderName+"\"");
         if( getValidInput() ){
            return folderName;
         } else {
            System.out.println("Okay... Lets try again.");
         }
      }while(true);

   }


   /**getFileName
   *gets file name from console
   */
   public static String getFileName()
   {
      
      Scanner kbd = new Scanner(System.in);
      String fileName;
     
      do
      {
         System.out.println("please enter a file name");
         fileName = kbd.next();
         System.out.println("\n\n You typed: \""+fileName+"\"");
         if( getValidInput() ){
            return fileName;
         } else {
            System.out.println("Okay... Lets try again.");
         }
      }while(true);

   }


   /*getValidInput
   * checks if user types y / yes or n / no
   **/
   public static boolean getValidInput()
   {
      System.out.println(" Is this correct?  (y/n)");
      Scanner kbd = new Scanner(System.in);
      
      String inp;
     
      do
      {
         inp = kbd.next();
         if( inp.charAt(0) == 'y' || inp.equals("y") )
         {
            
            System.out.println("You typed y.");
        
            return true;
         }
         else if(  inp.charAt(0) =='n' || inp.equals("n") )
         {
            System.out.println("You typed n.");
        
            return false;
         } else 
         {
            System.out.println("Invalid entry.\nYou typed ["+inp+"]\nPlease type y or n.");
            
         }

      }
      while( true );
      
      
      
      
   }  
   
}
