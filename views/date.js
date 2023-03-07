//This refers to take the day, month and years and post like a title
//Also it turn possible to add new items on the list

exports.getDate =  function () {
    const today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    return today.toLocaleDateString("pt-BR", options);
    
};