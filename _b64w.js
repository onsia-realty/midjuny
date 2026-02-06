var fs=require('fs');var c=Buffer.from(process.argv[1],'base64').toString('utf8');fs.writeFileSync(process.argv[2],c);console.log('OK:'+process.argv[2]);
