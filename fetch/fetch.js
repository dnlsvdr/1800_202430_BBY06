fetch("species_details.json").then((speciesData) => {
    speciesData.json().then((data) => {
        newData = [];
        data.forEach(species => {
            newSpecies = {
                name: species.common_name,
                type: species.type
                

            };
            newData.push(newSpecies);
        });
        console.log(newData);
    })
});
fetch;