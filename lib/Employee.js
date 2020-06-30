// TODO: Write code to define and export the Employee class
function Employee(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }

  Employee.prototype.printStats = function() {
	console.log("Name: " + this.name + "\nId: " + this.id +
	"\nemail ");
	console.log("\n-------------\n");
};


Employee.prototype.getName = function(str) {
  return str
    .split("")
    .reverse()
    .join("");
};

Employee.prototype.getName = function(str) {
  return this.reverse(str) === str;
};

Employee.prototype.capitalize = function(str) {
  return str.split(" ").map(word => {
    return word.substring(0, 1).toUpperCase() + word.substring(1);
  }).join(" ");
};

this.name = function() {
    return this.name;
},
//return this.name = getName();

/*
this.getName = function() {
    return this.name;
},

this.getId = function() {
    return this.id;
},
*/

module.exports = Employee;