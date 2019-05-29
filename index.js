const sqlite3=require("sqlite3").verbose();
const db=new sqlite3.Database(":memory:");

db.serialize(function(){
    db.run("CREATE TABLE instructor (ID NUMBER,NAME TEXT,Dept_Name TEXT,Salary NUMBER)");

    db.run("INSERT INTO Instructor VALUES(10101, 'Sirivisan','Comp.Sci.',65000)");
    db.run("INSERT INTO Instructor VALUES(12121, 'Wu','Finance',90000)");
    db.run("INSERT INTO Instructor VALUES(15151, 'Mozart','Music',90000)");
    db.run("INSERT INTO Instructor VALUES(22222, 'Einstein','physics',95000)");
    db.run("INSERT INTO Instructor VALUES(32343, 'El said','History',62000)");
    db.run("INSERT INTO Instructor VALUES(34565, 'Gold','physics',87000)");
    db.run("INSERT INTO Instructor VALUES(45565, 'katz','Comp.Sci',75000)");
    db.run("INSERT INTO Instructor VALUES(58583, 'Califier','History',62000)");
    db.run("INSERT INTO Instructor VALUES(76543, 'Singh','Finance',80000)");
    db.run("INSERT INTO Instructor VALUES(76766, 'Crick','Biology',72000)");
    db.run("INSERT INTO Instructor VALUES(83821, 'Brandit','Comp.Sci.',92000)");
    db.run("INSERT INTO Instructor VALUES(98345, 'Kim','Elec.Eng',80000)");
    
    db.each("SELECT * FROM Instructor", function(err,row){
       // if(err)
       // console.log(err);
        //console.log(row);
    });
db.each("SELECT DISTINCT Dept_Name FROM Instructor", function(err,row){
   // console.log(row.Dept_Name);
});
let results=new Array();
db.each("SELECT  name FROM Instructor WHERE Dept_Name='Comp.Sci.' AND salary>70000", function(err,row){
   results.push(row.Name);
},
      function(err,count)
      {
          let resultString="";
          for(let i=0;i!=results.length;++i)
          {
              if(i!=count-1)
              {
                  resultString += results[i]+", "
              }
              else
              resultString+= results[i];
          }
          console.log(resultString +"have a high salary");
      });
      //Instructor1,Instructor2  have a high slary.
      //prnt department names a

       let depts={};
      db.each("SELECT Dept_Name,salary FROM Instructor",function(err,row){
          //console.log(row);

          if (depts[row.Dept_Name]===undefined)
          depts[row.Dept_Name]=0;
          depts[row.Dept_Name]+=row.Salary;
      },function(err,count){
        // console.log(depts["History"+":"+depts["History"] +"yearly"]);
       let keys =Object.keys(depts);

       for(let i=0;i!=keys.length;i++)
       {
           console.log(keys[i]+":"+depts[keys[i]]+"yearly");
       }
      });
    });