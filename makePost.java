
import java.util.*; 
import java.io.FileWriter;   // Import the FileWriter class
import java.util.Scanner;
import java.nio.file.Files;

import java.io.File;  // Import the File class
import java.io.IOException;  // Import the IOException class to handle errors

//things have changed since my day
import java.util.logging.Logger;

//gotta use some regex here
import java.util.regex.Matcher;
import java.util.regex.Pattern;



/****************************************************************************
 * App Requirements
 * 
 * 
 *    UI
      accept directory for folder/files [x]
      accepts date as folder name [x]
      accepts blog or microblog as arguments [x]
      provides directory contents of folder [x]
      prompt user to review changes [x]

      Functions
      parse keyboard input for correct formatting [x]
      check if dated folder exists [x]
      check if dated html file exits (blog or microblog) [x]
      create new folder for indicated date [x]
      create new html file for indicated date [x]
      populate html file with boilerplate html code  [x]
      correctly adjust date of html post with date provided by user input [x]
****************************************************************************/
//2020-11-04@08:30
public class makePost {
   public static void main(String []args) throws IOException {
      Scanner kbd = new Scanner(System.in);
      //get new foldername from getFolderName method
      String newFolderName = getFolderName(); 
      //get new file name from getFileName method
      String newFileName = getFileName();
      //make the desired directory 
      String newDir = makeDirectoryWithFolderName(newFolderName);
      //make the file in the directory
      String fileWithDir = makeFileWithFileName(newFileName,newDir); //
      //now that we have forced the filename to be appropriate we may write to file
      writeToTheFile(fileWithDir, newFileName);
      //close the keyboard scanner
      kbd.close();
   }

   

   
   public static void writeToTheFile(String fileAndDirectoryString, String fileNameString){
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m1");
      String largeHtmlString=
         "<link rel=\"stylesheet\" media=\"screen\" href=\"https://fontlibrary.org/face/monoid\" type=\"text/css\"/>"+
         "\n<div class=\"filterDiv show\">"+
         "\n\t<article class=\"l\">" +
         "\n\t\t<a class=\"date\" date=\""+fileNameString+"\" id=\""+fileNameString+"\">"+fileNameString+"</a>"+
         "\n\n\n"+
         "\n\t\t<div class=\"sig\">-J</div>"+
         "\n\t</article>"+
         "\n</div>";
      String smallHtmlString = 
      "<link rel=\"stylesheet\" media=\"screen\" href=\"https://fontlibrary.org/face/monoid\" type=\"text/css\"/>"+
         "\n<div class=\"filterDiv show mb\">"+
         "\n\t<article class=\"s\">" +
         "\n\t\t<a class=\"date\" date=\""+fileNameString+"\" id=\""+fileNameString+"\">"+fileNameString+"</a>"+
         "\n\n\n"+
         "\n\t\t<div class=\"sig\">-J</div>"+
         "\n\t</article>"+
         "\n</div>";
      try( FileWriter myWriter = new FileWriter(fileAndDirectoryString) ) 
      {
         //if incase for small or large post
         if(checkForSubStringInFileName(fileNameString))
         {
            //its a microblog
            myWriter.write(smallHtmlString);
         } 
         else 
         {
            //its a regular blog post
            myWriter.write(largeHtmlString);
         }
         methodLogger.info("\nSuccessfully wrote to "+fileNameString+".\nFull path is "+fileAndDirectoryString);
      } catch (IOException e) {
         methodLogger.info("\n!!!An error occurred.");
         e.printStackTrace();
      } 
      
   }

   /**
    * This method checks the fileNameString to see if the file to be created is a microblog post. 
    * It then writes the appropriate text to the file after creation.
    * @param fileNameString
    * @return 
    */
   public static boolean checkForSubStringInFileName(String fileNameString ){
      //check if mb is in fileNameString
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m2");
      methodLogger.info("\nChecking to see if this is a regular Blog post or a MicroBlog post.");
      String substr = "mb";
      int n1 = fileNameString.length();
      int n2 = substr.length();
      for (int i = 0; i <= n1 - n2; i++) 
      {
         int j;
         for (j = 0; j < n2; j++) 
         {
            if (fileNameString.charAt(i + j) != substr.charAt(j))
               break;
         }
         if (j == n2) 
         {
            methodLogger.info("\nThis is a MicroBlog post");
            return true;
         }
      }
      methodLogger.info("\nThis is a regular Blog post");
      return false;
   }

   /**
    * Makes directory and returns the string
    * 
    * @param fn
    * @return
    * @throws IOException
    */
   public static String makeDirectoryWithFolderName(String fn) throws IOException {
      //get current directory 
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m3");
      methodLogger.info("\nWorking Directory = " + System.getProperty("user.dir"));
      String fd = System.getProperty("user.dir")+"\\posts\\"+fn;
      //make new sub directory
      methodLogger.info("\nNew Directory will be "+fd);
      //check for directory
      File f = new File(fd);
      String tempOutPut = "";
      if (f.exists() && f.isDirectory()) {
         methodLogger.info("\nDirectory aleady exists!\n<#######################################################>");
         //if it already exists, show me whats inside
         Files.list(new File(fd).toPath())
                .limit(10)
                .forEach(path -> {
                  //tempOutPut += "\n"+path;
                  methodLogger.info("-"+path);
                });
                
         methodLogger.info("\n<#######################################################>");
      } 
      else 
      {
         //make directory
         File theDir = new File(fd);
         if (!theDir.exists()){
            theDir.mkdirs();
         }  
      }
      return fd;
   }

   /**
    * Accepts file name as fn and the desired directory as nd.
    * Combines them into a useable path.
    * Returns an error if there was a problem, or the path string if all went according to plan.
    * @param fn
    * @param nd
    * @return rs
    */
   public static String makeFileWithFileName(String fn,String nd){
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m4");
      String rs = "";
      try 
      {
         rs=nd+"\\"+fn+".html";
         File myObj = new File(rs);
         if (myObj.createNewFile()) {
         methodLogger.info("\nFile created: " + myObj.getName());
            return rs;
         } else {
            methodLogger.info("\n[!]File already exists!");
            return nd+"\\"+fn+"_FILE_ALREADY_EXISTS.txt";
         }
      } 
      catch (IOException e) 
      {
         methodLogger.info("\n[!]File could not be created. Exception e thrown!");
         e.printStackTrace();
         return nd+"\\"+fn+"_FILE_COULD_NOT_BE_CREATED.txt";
      }
   }


  


   /**
    * Gets the foldername with a scanner from keyboard input.  
    * @return folderName
    */
   public static String getFolderName()
   {
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m5");
      methodLogger.info("DEBUG MSG\n");
      Scanner kbd = new Scanner(System.in);
      String folderName;
      do
      {
         System.out.println("\nPlease enter a folder name");
         folderName = kbd.next();
         System.out.println("\nYou typed: \""+folderName+"\"");
         if( checkInputAgainstRegex(folderName) ){
            if( getValidInput() ){
               //kbd.close();
               return folderName;
            } else {
               System.out.println("\n\nOkay... Lets try again.");
            }
         }
      }while(true);
      
   }


   /**
    * Gets file name from user input using keyboard scenner
    * @return fileName
    */
   public static String getFileName()
   {
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m6");
      methodLogger.info("DEBUG MSG\n");
      Scanner kbd = new Scanner(System.in);
      String fileName;
      do
      {  
         System.out.println("\nPlease enter a file name");
         fileName = kbd.nextLine();
         System.out.println("\n\n You typed: \""+fileName+"\"");
         if( checkInputAgainstRegex(fileName) ){
            if( getValidInput() ){
               //kbd.close();
               return fileName;
            } else {
               System.out.println("\n\nOkay... Lets try again.");
            }
         }
         
      }while(true);

   }


   /**
    * Validates users input
    * @return true
    */
   public static boolean getValidInput()
   {
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m7");
      methodLogger.info("DEBUG MSG\n");
      System.out.println("[!]Is this correct?  (y/n)");
      Scanner kbd = new Scanner(System.in);
      String inp;
      do
      {
         inp = kbd.next();
         if( inp.charAt(0) == 'y' || inp.equals("y") )
         {
            System.out.println("[!]You typed y.\n-------------------------");
            return true;
         }
         else if(  inp.charAt(0) =='n' || inp.equals("n") )
         {
            System.out.println("[!]You typed n.\n-------------------------");
            kbd.close();
            return false;
         } else 
         {
            System.out.println("[!]Invalid entry.\nYou typed ["+inp+"]\nPlease type y or n.\n-------------------------");  
         }
      }
      while( true );
   }  
   

   /**
    * 
    * @param userInputString
    * @return matcher
    */
   public static boolean checkInputAgainstRegex(String userInputString){
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m7");
      methodLogger.info("DEBUG MSG\n");
      Pattern pattern;
      Matcher matcher;
      String REGEX = "([0-9]{4}-[0-9]{2}-[0-9]{2})";
      pattern = Pattern.compile(REGEX);
      matcher = pattern.matcher(userInputString);
      if(matcher.find()) { 
         methodLogger.info("Input Valid");
         return true;       
      } else {
         methodLogger.info("Input Invalid");
         return false;
      } 
   }

   /**
    * 
    * @param userInputString
    * @return matcher
    */
    public static boolean checkInputAgainstRegexForMicroBlog(String userInputString){
      Logger methodLogger = Logger.getLogger(makePost.class.getName()+"-m8");
      methodLogger.info("DEBUG MSG\n");
      Pattern pattern;
      Matcher matcher;
      String REGEX = "([0-9]{4}-[0-9]{2}-[0-9]{2}-[m][b]-[0-9])";
      pattern = Pattern.compile(REGEX);
      matcher = pattern.matcher(userInputString);
      if(matcher.find()) { 
         methodLogger.info("Input Valid");
         return true;       
      } else {
         methodLogger.info("Input Invalid");
         return false;
      }  
   }

}
