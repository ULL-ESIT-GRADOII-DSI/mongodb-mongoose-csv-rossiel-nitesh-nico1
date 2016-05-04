(function(exports)
{
  "use strict";
  const util = require('util');
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://localhost/schema');
  const CsvSchema = mongoose.Schema({ 
    "id" : String,
    "data" : String
  });
  
  const Csv = mongoose.model("Csv", CsvSchema);

  Csv.remove({}).exec();
  let c1 = new Csv({'id':'input1', 'data':"'producto','precio' 'camisa','4,3' 'libro de O\"Reilly', '7,2'"});
  let c2 = new Csv({'id':'input2', 'data':"'producto','precio' 'fecha' 'camisa','4,3','14/01' 'libro de O\"Reilly', '7,2' '13/02'"});
  let c3 = new Csv({'id':'input3', 'data':"'edad', 'sueldo','peso','6000€', '90Kg' 47, '3000€', '100Kg'"});


  let p1 = c1.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c1}`);
  });
  
    let p2 = c2.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c2}`);
  });

  let p3 = c3.save(function (err) {
    if (err) { console.log(`Hubieron errores:\n${err}`); return err; }
    console.log(`Saved: ${c3}`);
  });


Promise.all([p1,p2,p3]).then( (value) => { 
    console.log(util.inspect(value, {depth: null}));  
  //  mongoose.connection.close(); No cerrar nunca la conección, produce errores de sincronización
  });
  module.exports=Csv;
})();