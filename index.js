const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
/*
path: 저장할 파일명
header: [
    { id: 쓰기 데이터 객체의 key, title: csv 파일 헤더(첫 번째 라인)의 이름 },
]
*/
const csvWriter = createCsvWriter({
    path: './csv/result.csv',
    header: [
        { id: 'title', title: 'Title' },
        { id: 'link', title: 'Link' },
    ],
});

const result = [];

fs.createReadStream('./csv/data.csv')
    .pipe(csv())
    .on('data', (row) => {
        let data = {
            title: row.Title,
            link: row.Link,
        };
        result.push(data);
    })
    .on('end', () => {
        console.log('CSV file successfully processed');
        csvWriter
            .writeRecords(result)
            .then(() => console.log('The CSV file was written successfully'))
            .catch(() => console.log('write error'));
    });
