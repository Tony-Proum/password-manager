/**
 * Created by Tony
 */
var animal = '{"name" : "Tina"}';
var animalObject = JSON.parse(animal);
animalObject.age = 11;
var animalJson = JSON.stringify(animalObject);
console.log(animalJson);