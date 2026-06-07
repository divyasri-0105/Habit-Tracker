const addButton = document.getElementById("addButton");
const habitList = document.getElementById("habitList");
const habitInput = document.getElementById("habitInput");

let habits = [];
const savedHabits = localStorage.getItem("habits");

if(savedHabits){
    habits = JSON.parse(savedHabits);
}

function renderHabits(){
    habitList.innerHTML = "";

    habits.forEach(function(habit, index){
        const newHabit = document.createElement("li");
        newHabit.textContent = habit;

        newHabit.addEventListener("dblclick", function(){
        habits.splice(index, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
    });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        checkbox.addEventListener("change", function(){

            if(checkbox.checked){
            newHabit.classList.add("completed");
            }else{
                newHabit.classList.remove("completed");
            }

        });

            newHabit.prepend(checkbox);
            habitList.appendChild(newHabit);
    });
}

addButton.addEventListener("click", function() {
    const habit = habitInput.value.trim();
    if(habit === ""){
        return;
    }
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
    habitInput.value = "";
});

habitInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addButton.click();
    }
});
renderHabits();