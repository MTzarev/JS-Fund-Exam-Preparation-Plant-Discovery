function plantDiscovery(input) {
    let actions = {
        'Rate': rate,
        'Update': update,
        'Reset': reset,
    };
    let n = Number(input.shift());
    let plantBook = {};

    for (let i = 0; i < n; i++) {
        let [name, rarity] = input.shift().split('<->');
        plantBook[name] = {
            rarity: Number(rarity),
            ratings: [],
            avrRating: 0,
            sumRatings: 0,
            ratingCount: 0
        };
    }

    while (input[0] !== 'Exhibition') {
        let [command, params] = input.shift().split(': ');
        let action = actions[command];
        if (action) action(params);
    }

    function rate(line) {
        let [name, rating] = line.split(' - ');
        if (plantBook[name] !== undefined) {
            let plant = plantBook[name];
            plant.ratings.push(Number(rating));
            plant.sumRatings += Number(rating);
            plant.ratingCount++;
        } else {
            console.log('error');
        }
    }

    function update(line) {
        let [name, rarity] = line.split(' - ');
        if (plantBook[name] !== undefined) {
            let plant = plantBook[name];
            plant.rarity = Number(rarity);
        } else {
            console.log('error');
        }
    }

    function reset(name) {
        if (plantBook[name] !== undefined) {
            let plant = plantBook[name];
            plant.ratings.length = 0;
            plant.sumRatings = 0;
            plant.ratingCount = 0;
        } else {
            console.log('error');
        }
    }

    let sorted = Object.entries(plantBook).sort(comparePlants);

    function comparePlants(a, b) {
        let rarityA = a[1].rarity;
        let rarityB = b[1].rarity;
        let ratingA = a[1].avrRating;
        let ratingB = b[1].avrRating;

        // Sort by rarity descending
        // if (rarityB !== rarityA) {
        //     return rarityB - rarityA;
        // } else {
        //     // If rarity is the same, prioritize Arnoldii over Woodii
        //     if (a[0] === "Arnoldii" && b[0] === "Woodii") {
        //         return -1;
        //     } else if (a[0] === "Woodii" && b[0] === "Arnoldii") {
        //         return 1;
        //     }
        //     return ratingB - ratingA;
        // }
    }

    console.log('Plants for the exhibition:');
    for (let [name, plant] of sorted) {
        if (plant.ratingCount > 0) {
            plant.avrRating = plant.sumRatings / plant.ratingCount;
        }
        console.log(`- ${name}; Rarity: ${plant.rarity}; Rating: ${plant.avrRating.toFixed(2)}`);
    }
}
plantDiscovery((["3",
"Arnoldii<->4",
"Woodii<->7",
"Welwitschia<->2",
"Rate: Woodii - 10",
"Rate: Welwitschia - 7",
"Rate: Arnoldii - 3",
"Rate: Woodii - 5",
"Update: Woodii - 5",
"Reset: Arnoldii",
"Exhibition"])
)