 var Util = {
   randNameElite: function() {
     var pairs = "..lexegezacebiso" +
         "usesarmaindirea." +
         "eratenberalaveti" +
         "edorquanteisrion";

     var pair1 = 2 * Math.floor(Math.random() * (pairs.length / 2));
     var pair2 = 2 * Math.floor(Math.random() * (pairs.length / 2));
     var pair3 = 2 * Math.floor(Math.random() * (pairs.length / 2));
     var pair4 = 2 * Math.floor(Math.random() * (pairs.length / 2));

     var name = "";
     name += pairs.substr(pair1, 2);
     name += pairs.substr(pair2, 2);
     name += pairs.substr(pair3, 2);
     name += pairs.substr(pair4, 2);
     name = name.replace(/[.]/g, "");

     return name.charAt(0).toUpperCase() + name.slice(1);
   }
 };

 module.exports = Util;
