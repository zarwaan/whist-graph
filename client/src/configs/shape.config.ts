const obj1 = {
    1: {
        x: 50,
        y: 49
    },
}

const obj2 = {
    1: {
        x: 8,
        y: obj1[1].y
    },
    2: {
        x: 92,
        y: obj1[1].y
    },
}

const obj3 = {
    1: {
        x: obj2[1].x,
        // x: "50%",
        y: 12
    },
    2: {
        x: obj2[2].x,
        y: 12
    },
    3: {
        x: 50,
        y: 88
    },
}

const obj4 = {
    1: obj3[1],
    2: obj3[2],
    3: {
        x: obj3[2].x,
        y: obj3[3].y,
    },
    4: {
        x: obj3[1].x,
        y: obj3[3].y
    }
}

const obj5 = {
    1: {
        x: 50,
        y: obj3[1].y
    },
    2: {
        x: obj4[2].x,
        y: obj1[1].y,
    },
    3: {
        // x: ((obj2[2].x) * 5 / 6), // 100 - 8 - 8 / 3 * 2
        x: 100 * 3 / 4,
        y: obj4[3].y,
    },
    4: {
        // x: (obj2[2].x) * 2 / 6, // 100 - 8 - 8 / 3,
        x: 100 / 4,
        y: obj4[4].y, 
    },
    5: {
        x: obj2[1].x,
        y: obj1[1].y
    }
}

const obj6 = {
    1: {
        x: obj5[4].x,
        y: obj3[1].y
    },
    2: {
        x: obj5[3].x,
        y: obj3[1].y
    },
    3: obj5[2],
    4: obj5[3],
    5: obj5[4],
    6: obj5[5]
}

export const shapeConfig: any = {
    1: obj1,
    2: obj2,
    3: obj3,
    4: obj4,
    5: obj5,
    6: obj6
}