let globalClassesList = [
    {
        name: 'KREIS',
        methods: [
            {
                name: 'MittelpunktSetzen',
                parameters: [
                    'number', // x
                    'number' // y
                ],
            },
            {
                name: 'FüllfarbeSetzen',
                parameters: [
                    'string' // f
                ],
            },
            {
                name: 'RadiusSetzen',
                parameters: [
                    'number' // r
                ]
            },
        ],
    },
    {
        name: 'RECHTECK',
        methods: [
            {
                name: 'PositionSetzen',
                parameters: [
                    'number', // x
                    'number' // y
                ]
            },
            {
                name: 'FüllfarbeSetzen',
                parameters: [
                    'string' // f
                ]
            },
            {
                name: 'LängeSetzen',
                parameters: [
                    'number' // l
                ]
            },
            {
                name: 'BreiteSetzen',
                parameters: [
                    'number' // b
                ]
            },
        ],
    },
    {
        name: 'DREIECK',
        methods: [
            {
                name: 'PositionSetzen',
                parameters: [
                    'number', // x
                    'number' // y
                ]
            },
            {
                name: 'FüllfarbeSetzen',
                parameters: [
                    'string' // f
                ]
            },
            {
                name: 'HöheSetzen',
                parameters: [
                    'number' // h
                ]
            },
            {
                name: 'BreiteSetzen',
                parameters: [
                    'number' // b
                ]
            },
        ],
    },
]