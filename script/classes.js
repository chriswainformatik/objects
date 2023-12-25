// name: display name
// name2: internal name
let globalClassesList = [
    {
        name: 'KREIS',
        attributes: [
            {
                name: 'füllfarbe',
                name2: 'fillColor',
                type: 'string'
            },
            {
                name: 'linienart',
                name2: 'lineStyle',
                type: 'string'
            },
            {
                name: 'linienfarbe',
                name2: 'lineColor',
                type: 'string'
            },
            {
                name: 'linienstärke',
                name2: 'lineWidth',
                type: 'number'
            },
            {
                name: 'mittelpunktX',
                name2: 'x',
                type: 'number'
            },
            {
                name: 'mittelpunktY',
                name2: 'y',
                type: 'number'
            },
            {
                name: 'radius',
                name2: '',
                type: 'number'
            },
            {
                name: '',
                name2: 'w',
                type: 'number'
            },
            {
                name: '',
                name2: 'l',
                type: 'number'
            },
        ],
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
            {
                name: 'LinienstärkeSetzen',
                parameters: [
                    'number'
                ]
            },
            {
                name: 'LinienfarbeSetzen',
                parameters: [
                    'string'
                ]
            },
            {
                name: 'LinienartSetzen',
                parameters: [
                    'string'
                ]
            },
        ],
    },
    {
        name: 'RECHTECK',
        attributes: [
            {
                name: 'breite',
                name2: 'w',
                type: 'number',
            },
            {
                name: 'füllfarbe',
                name2: 'fillColor',
                type: 'string'
            },
            {
                name: 'länge',
                name2: 'h',
                type: 'number'
            },
            {
                name: 'linienart',
                name2: 'lineStyle',
                type: 'string'
            },
            {
                name: 'linienfarbe',
                name2: 'lineColor',
                type: 'string'
            },
            {
                name: 'linienstärke',
                name2: 'lineWidth',
                type: 'number'
            },
            {
                name: 'xKoordinate',
                name2: 'x',
                type: 'number'
            },
            {
                name: 'yKoordinate',
                name2: 'y',
                type: 'number'
            },
        ],
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
            {
                name: 'LinienstärkeSetzen',
                parameters: [
                    'number'
                ]
            },
            {
                name: 'LinienfarbeSetzen',
                parameters: [
                    'string'
                ]
            },
            {
                name: 'LinienartSetzen',
                parameters: [
                    'string'
                ]
            },
        ],
    },
    {
        name: 'DREIECK',
        attributes: [
            {
                name: 'breite',
                name2: 'w',
                type: 'number',
            },
            {
                name: 'füllfarbe',
                name2: 'fillColor',
                type: 'string'
            },
            {
                name: 'höhe',
                name2: 'h',
                type: 'number'
            },
            {
                name: 'linienart',
                name2: 'lineStyle',
                type: 'string'
            },
            {
                name: 'linienfarbe',
                name2: 'lineColor',
                type: 'string'
            },
            {
                name: 'linienstärke',
                name2: 'lineWidth',
                type: 'number'
            },
            {
                name: 'xKoordinate',
                name2: 'x',
                type: 'number'
            },
            {
                name: 'yKoordinate',
                name2: 'y',
                type: 'number'
            },
        ],
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
            {
                name: 'LinienstärkeSetzen',
                parameters: [
                    'number'
                ]
            },
            {
                name: 'LinienfarbeSetzen',
                parameters: [
                    'string'
                ]
            },
            {
                name: 'LinienartSetzen',
                parameters: [
                    'string'
                ]
            },
        ],
    },
]