const response = [
    {
      "_id": "64530fcf1406f4f715df1214",
      "subjects": [
        {
          "name": "Maths",
          "Teacher_SysID": "004",
          "dates": [
            {
              "date": "2022-03-25",
              "attendance": [
                {
                  "SystemID": "001",
                  "value": true
                },
                {
                  "SystemID": "002",
                  "value": false
                }
              ]
            },
            {
              "date": "2022-03-26",
              "attendance": [
                {
                  "SystemID": "001",
                  "value": false
                },
                {
                  "SystemID": "002",
                  "value": true
                }
              ]
            }
          ]
        },
        {
          "name": "Science",
          "Teacher_SysID": "004",
          "dates": [
            {
              "date": "2022-03-25",
              "attendance": [
                {
                  "SystemID": "001",
                  "value": false
                },
                {
                  "SystemID": "002",
                  "value": true
                }
              ]
            },
            {
              "date": "2022-03-26",
              "attendance": [
                {
                  "SystemID": "001",
                  "value": true
                },
                {
                  "SystemID": "002",
                  "value": false
                }
              ]
            }
          ]
        }
      ],
      "attendance": []
    }
  ];
  
  const scienceSubject = response[0].subjects.find(subject => subject.name === 'Science');
  const scienceDates = scienceSubject.dates.map(dateObj => dateObj.date);
  
  console.log(scienceDates); // ["2022-03-25", "2022-03-26"]
  