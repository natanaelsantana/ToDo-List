//This refers to take the day, month and years and post like a title
//Also it turn possible to add new items on the list

function  getDate () {
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("pt-BR", options);
    return day
};