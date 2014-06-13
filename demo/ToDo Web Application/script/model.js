function DataItem(data,db,totalTask)
{
  this.setData(data,db,totalTask);
}
DataItem.prototype = {
  data:{},
  totalTask:{},
  setData:function(data,db,totalTask)
  {
    this.data=data;
    this.totalTask=totalTask;
    var dbObj = new DbManager(db);
    dbObj.store(data,totalTask);
  },
  getData:function(){
    return this.data;
    return this.totalTask;
  }
}
function DbManager(dbName){
  this.db = dbName;
}
DbManager.prototype ={
  store:function(data){
        this.keycount();
        var sessionFile=window.sessionStorage;
        var totalTask = sessionFile.length;
        totalTask = parseInt(totalTask)+1;
        var dataString=JSON.stringify(data);
        this.db.setItem(data.key,dataString,totalTask);
  },
    
    keycount:function(){
      var itemsInDb = this.getItemFromDb();
        var key;
        var length=itemsInDb.length;
        if(length===0)
        {
          key=0;
        }
        else
        {
          key = itemsInDb[length-1].key + 1;
        }
        return key;
    },
    getItemFromDb:function(){
       var tempArray =[];
       var dataBase = this.db;
       for(i in dataBase)
       {
          dataObj =JSON.parse(dataBase[i]);
          tempArray.push(dataObj);
       }
         tempArray.sort(function(a,b){
           return a.key-b.key;
         })
       return tempArray;
    },
    removeItemFromDb:function(key)
    {
      this.db.removeItem(key);
    },
    changeDbitemstatus:function(key,className)
    {
      var clone = this.db[key];
      this.db.removeItem(key);
      var b = JSON.parse(clone);
      b.class = className;
      var c =JSON.stringify(b);
      this.db.setItem(key,c);
    },
    changeDbitemstatuss:function(key,className)
    {
      var clone = this.db[key];
      this.db.removeItem(key);
      var b = JSON.parse(clone);
      b.status = className;
      var c = JSON.stringify(b);
      this.db.setItem(key,c);
    }
}
