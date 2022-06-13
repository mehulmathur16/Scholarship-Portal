var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : process.env.IP,
  user     : process.env.C9_USER,
  password : '',
  database : 'c9'
});
var questionnum=0;
var aid=0;

module.exports={
    
    insert:function(req,res){
        
        
        
var FieldOne=req.query.sname;
var FieldTwo=req.query.authority;
var FieldThree=req.query.aname;
var FieldFour=req.query.spass;
var FieldFive=req.query.cutoff;
var FieldSix=req.query.state;
var FieldSeven=req.query.applbranchtotal;
var FieldEight=req.query.applbranch;
var FieldNine=req.query.incomelimit;
var FieldTen=req.query.benefit;
var FieldEleven=req.query.link;
var sql = 'INSERT INTO schol(sname,authority,aname,spass,cutoff,state,applbranchtotal,applbranch,incomelimit,benefit,link)  VALUES('+FieldOne+',\''+FieldTwo+'\',\''+FieldThree+'\',\''+FieldFour+'\',\''+FieldFive+'\',\''+FieldSix+'\',\''+FieldSeven+'\',\''+FieldEight+'\',\''+FieldNine+'\',\''+FieldTen+'\','+FieldEleven+')';
con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(result);
           res.send(result);
         });
                
        
    },
    update:function(req,res){
        
        
        
    },
    allscholar:function(req,res){
       var sql = "SELECT id,sname,authority FROM schol;";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(result);
           res.send(result);
         });
         
        
        
        
        
    },
    fourscholar:function(req,res){
                
        var sql = "SELECT id,sname,authority FROM schol WHERE id>23;";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(result);
           res.send(result);
         });
        
        
    },
    filterscholar:function(req,res){
        console.log(req.query);
        var category=req.query.category;
        var authority=req.query.authority;
        var region=req.query.region;
        var highquali = req.query.qualification;
        var sql="";
        if(authority){
            
            
        // make string
         var cat=authority.split(",");
         console.log(cat);
         var incat="(";
       for(var i=0;i<cat.length;i++){
           
           incat=incat+"'"+cat[i]+"'";
           if(i<cat.length-1){
               incat=incat+",";
           }
          
          
          
       }
          incat=incat+")";
            if(region=='India'){
        
                 sql = "SELECT id,sname,authority FROM schol WHERE category='"+category+"' AND authority IN "+incat+" AND spass='"+highquali+"';";
                    
            }else{
            
                 sql = "SELECT id,sname,authority FROM schol WHERE category='"+category+"' AND authority IN "+incat+" AND spass='"+highquali+"' AND state="+region+"';";
                    
        }
            
            
            
            
        }else{
            
            if(region=='India'){
        
                 sql = "SELECT id,sname,authority FROM schol WHERE category='"+category+"' AND spass='"+highquali+"';";
                    
            }else{
            
                 sql = "SELECT id,sname,authority FROM schol WHERE category='"+category+"' AND spass='"+highquali+"' AND state="+region+"';";
                
        }
        
        }
        
        console.log(req.params);
        console.log(sql);
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log(result);
           res.send(result);
         });
         
        
        
        
        },
        scholarshipbyid:function(req,res){
            
            
            var sql="SELECT * FROM schol WHERE id="+req.query.id;
            console.log(sql);
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
           });
               
            
        },
        addques:function(req,res){
            
               questionnum++;
          var sql='INSERT INTO question VALUES('+req.query.id+','+questionnum+',\''+req.query.qtext+'\')';
               console.log(sql);
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
           });
      
            
            
        },
        addans:function(req,res){
             aid++; 
            var sql='INSERT INTO answers VALUES('+req.query.id+','+req.query.qnum+','+req.query.aid+',\''+req.query.anssent+'\')';
               console.log(sql);
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            
           });
         
        },
        getall:function(req,res){
            var sql='SELECT * FROM answers a,question q WHERE a.sid=q.sid AND a.qid=q.qid';
            console.log(sql);
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            
           });
        },
        getques:function(req,res){
            var sql='SELECT * FROM question';
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            
           });
           
        },
        getans:function(req,res){
          
            var sql='SELECT * FROM answers';
           
            con.query(sql, function (err, result) {
            if (err) throw err;
            console.log(result);
            res.send(result);
            
           });
           
        }
        
    
    
    
    
    
} 