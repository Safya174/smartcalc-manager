
var number = document.getElementById("Screen");
var Result = document.getElementById("Result")
var Operand1 = ""
var Operand2 = ""
var Operation =""
var issecond = false;
var allData= [];
var storedData = localStorage.getItem("CalcDate");

if(storedData){
   allData = JSON.parse(storedData);
   display();
}
function addNumber(num)
{
   if(num == "+"|| num == "-"||num == "÷" || num == "x" )
   {
      Operation = num;
      issecond = true
   }
   else if(num == "=")
   {
      calculate();
      display();
   }
   else if(num == "AC")
   {
      clearCalc();
   }
   else if(num == "⌫")
   {
      deleteLast();
   }
   else{
    if(issecond)
      {
         Operand2 += num;
      }
   else{
      Operand1 += num
   }
   }
   number.innerText = Operand1 +" "+Operation +"  "+ Operand2;
  
}
function calculate(){
  switch(Operation)
  {
    case "+" : Result.innerText = Number(Operand1) +Number(Operand2);break;
    case "-" : Result.innerText = Operand1 - Operand2;break;
    case "÷" : Result.innerText = Operand1 / Operand2;break;
    case "x" : Result.innerText = Operand1 * Operand2;break;
  }
   var dataOfOpeations = {
      Exepration: Operand1 +" "+ Operation +"  "+ Operand2,
      Result1 : Result.innerText,
      Time : new Date().toLocaleString()
   };
   allData.push(dataOfOpeations);
   localStorage.setItem("CalcDate",JSON.stringify(allData))
}
function clearCalc(){
   Operand1 = "";
   Operand2 = "";
   Operation = "";
   Result.innerText = 0;
}
function deleteLast() {
  if (issecond && Operand2 !== "") {
   
    Operand2 = Operand2.slice(0, -1);
  } 
  else if (Operation !== "" && Operand2 === "") {
    
    Operation = "";
    issecond = false;
  } 
  else {
    Operand1 = Operand1.slice(0, -1);
  }
  
  number.innerText = Operand1 + " " + Operation + " " + Operand2;
}
function display()  {
 var Cartona = "";
 for(var i=0; i< allData.length;i++){
   Cartona += `<tr>
           <td>${allData[i].Exepration}</td>
            <td>${allData[i].Result1}</td>
            <td>${allData[i].Time}</td>
            <td >

            <button type="button" class="btn btn-success mt-2 " onclick="buttonDisplay(${i})"   >Display</button>
            <button type="button" class="btn btn-warning mt-2 " onclick="buttonUpdate(${i})" >Update</button>
            <button type="button" class="btn btn-danger mt-2 " onclick="buttonDelete(${i})"  >Delete</button></td>
          </tr>`
 }
 document.getElementById("Save").innerHTML = Cartona;
}
function buttonDelete(index){
   allData.splice(index,1);
   localStorage.setItem("CalcDate",JSON.stringify(allData))
   display();
}
function buttonDisplay(index){
  alert("Exepration :  " + allData[index].Exepration +"\n"+ "Result :" + allData[index].Result1 +"\n"+ "Time : " + allData[index].Time);
  localStorage.setItem("CalcDate",JSON.stringify(allData))
 
}
function buttonUpdate(index){
   var oldExep = allData[index].Exepration;
   var newExep = prompt("Edit the Expression:",oldExep);
   if(newExep != null){
      try{
         var newResult = eval(newExep);
         allData[index].Exepration = newExep
         allData[index].Result1 = newResult;
         allData[index].Time = new Date().toLocaleString();
         localStorage.setItem("CalcDate",JSON.stringify(allData));
         display();
      }
      catch(e){
         alert("Invalid expression. Please try again.");
      }
   }
}