function ensureTableSearchQueriesExists(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS SearchQueries (id INTEGER PRIMARY KEY, searchQuery TEXT)');
}
function ensureTableSavedSearchesExists(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS SavedSearches (id INTEGER PRIMARY KEY, searchName TEXT, searchQuery TEXT)');
}
function createDataBase(dbName, version, dbDisplayName, size)
{
	var db = window.openDatabase(dbName, version, dbDisplayName, size);
	return db;
}
function AddInformationToSearchQueriesTable(db,query)
{
	db.transaction(
    //function sql statements
    function (tx){
    	ensureTableSearchQueriesExists(tx); 
		var sql = 'INSERT INTO SearchQueries (searchQuery) VALUES ("'+query+'")';
		tx.executeSql(sql);
	},
	//error callback
	function (err){
		alert("error callback "+err.code);
	},
	//success callback
	function (responce){
	}
    );
}
function AddInformationToSavedSearchesTable(db,searchName,searchQuery)
{
	db.transaction(
    //function sql statements
    function (tx){
    	ensureTableSavedSearchesExists(tx); 
		var sql = 'INSERT INTO SearchQueries (searchName, searchQuery) VALUES ("'+searchName+'", "'+ searchQuery +'")';
		tx.executeSql(sql);
	},
	//error callback
	function (err){
		alert("error callback "+err.code);
	},
	//success callback
	function (responce){
	}
    );
}
function GetInformationFromSearchQueriesTable(db)
{
	db.transaction(
	//function sql statements
	function (tx){
		ensureTableSearchQueriesExists(tx);
		tx.executeSql('SELECT * FROM SearchQueries', 
		[], 
		function(tx, results)
		{
			var htmlStr=""; 
			for(var index=0;index<results.rows.length;index++)
			{
				var item = results.rows.item(index);
				htmlStr=htmlStr+item.searchQuery;                                                                                                                
			}
			return htmlStr;
        },
		function(err)
		{
			alert("Unable to fetch result from SearchQueries Table");
        }
        ); },
		//error callback
		function (err)
		{
			alert("error callback "+err.code+" "+err.message);                                                                
		},
		//success callback
		function (){}
		); 
}