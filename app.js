var express=require('express');
var app=express();
var serv=require('http').Server(app);

//var profiler = require('v8-profiler');
var fs=require('fs');


app.get('/',function(req,res){
	res.sendFile(__dirname+'/client/index.html');
});
app.use('/client',express.static(__dirname+'/client'));

serv.listen(process.env.PORT||2000);
console.log("Server started.");

var SOCKET_LIST={};
var RESOURCE_LIST={};
var RESOURCE_LIST_LAND={};
var COLOUR_LIST=['blue', 'burlyWood', 'cadetBlue', 'cornflowerBlue', 'gold', 'darkViolet', 'green', 'dimGray','lightCoral', 'red', 'seaGreen', 'sandyBrown', 'salmon','springGreen', 'teal', 'powderBlue', 'purple', 'plum','paleVioletRed ','Brown'];

var Land=function(x,y,parent,landcolour){

	var aland={
		id:Math.random(),
	};
	aland.y=y;
	aland.x=x;
	aland.parent=parent;
	//var super_update=aland.update;
	aland.colour=landcolour;
	aland.update=function(){
		
		for (var i in Player.list)
		{
			var p=Player.list[i];
			var parentofland=Player.list[aland.parent];
			if(testCollisionEntity(p,aland) && aland.parent !=p.id && aland.colour==='black' )
			{
				var alist=[];
				var w;
		
				for( w in Land.list)
				{
					var procedureland=Land.list[w];

					if(aland.parent === procedureland.parent)
					{
						alist.push(procedureland);
					}
				}

				var alistlength=(Math.floor((alist.length/2)-1));
				var i;

				for (i = 0; i < alistlength; i++)
				{
					
					Land.list[alist[i].id].colour=p.colour;
					if(Player.list[alist[i].parent]!==undefined )
						Player.list[alist[i].parent].landcount--;
					Land.list[alist[i].id].parent=p.id;
					p.landcount++;
				};

				var o;

				for ( o= 0; o < 1; o++)
				{
					
					p.landcount++;
					if(Player.list[aland.parent]!==undefined )
						Player.list[aland.parent].landcount--;
					aland.colour=p.colour;
					aland.parent=p.id;
				};

				
				//if(Player.list[alist[i].parent]!==undefined )
						//Player.list[alist[i].parent].landcount--;

				//if(alist.length===1){
					//Land.list[alist[0].id].colour=p.colour;
					//if(Player.list[alist[i].parent]!==undefined)
					//	Player.list[alist[i].parent].landcount--;
					//alist[i].parent=p.id;
					//p.landcount++;
			//	}
				//aland.colour=p.colour;
				
			
				//also player dies after2 landmines
			}
			//if(testCollisionTile(p,aland) && aland.parent !=p.id && aland.colour==='Brown' )
			//{
				//Land.list[aland.id].colour=p.colour;
				//Land.list[aland.id].parent=p.id;
				//p.landcount++;
				
			//}
				
		}

		//for (var i in Land.list)
		//{
			//var p=Land.list[i];
			//if(testCollisionbricks(p,aland) && aland.parent ===p.parent && aland.id != p.id)
			//{
				//aland.colour='pink';
				//delete Land.list[aland.id];
				//removePack.land.push(aland.id);
				//Player.list[aland.parent].landcount--;

				//p.colour='black';
				//aland.parent=p.id;ddd
			
				//also player dies after2 landmines
			//}
			
				
		//}
		if( timer>150)
		{
			for (var i in Player.list)
			{
				var p=Player.list[i];
				var atemplandlist=[];
				for(var j in Land.list)
				{
					var land=Land.list[j];
					if(land.parent===p.id)
					{
						atemplandlist.push(land);
					}

				}
				if(atemplandlist.length>0)
				{
					for(var i=0;i<1;i++)
					{
						for(var g=0;g<(atemplandlist.length);g++)
						{
							if(Land.list[atemplandlist[g].id].colour==='black')
								Land.list[atemplandlist[g].id].colour=p.colour;
						}
						var num=Math.floor(atemplandlist.length*Math.random());
						if(Land.list[atemplandlist[num].id]!==undefined)
							Land.list[atemplandlist[num].id].colour="black";

					}
				}
				atemplandlist=[];	
			}
			timer=0;

		}
		

			



	}
	aland.getInitPack=function(){
		return{
			id:aland.id,
			x:aland.x,
			y:aland.y,
			parent:aland.parent,
			colour:aland.colour,

			
		};
	}

	Land.list[aland.id]=aland;
	
	return aland;

	//initPack.land.push({
		//id:aland.id,
		//x:aland.x,
		//y:aland.y,
		//parent:aland.parent,
		//colour:aland.colour,
	//});
}
Land.list={};


Land.update=function()
{
	var pack=[];
	for(var i in Land.list){
		var land =Land.list[i];
		land.update();
		{
			pack.push({

			//x:land.x,
			//y:land.y,
			id:land.id,
			parent:land.parent,
			colour:land.colour,
			});
		}
			
	}
	return pack;
	
}

var z;
var p;
for(z=0;z<675;z+=25)
{

			for(p=0;p<675;p+=25) //1075
			{ 
				//var rannum=Math.floor(Math.random()*18);
				

				Land(p,z,'null','lightgrey');

				

				

				
				
			}

		}






Resource = function (id,x,y)
{
	var aresource={
		x:x,
		y:y,
		id:id,
		color:'orange',

	};

	aresource.update=function()
	{
		for (var i in Player.list)
		{
			var p=Player.list[i];
			if(testCollisionEntity(p,aresource))
			{
				delete RESOURCE_LIST[aresource.id];
				removePack.resource.push(aresource.id);
				p.resourceGold++;
				if(p.resourceGold >5 ){
					p.resourceGold=0;
					p.resourceBombs++;
				}
			}
				
		}
		
	}
	
	RESOURCE_LIST[aresource.id]=aresource;
	
	return aresource;
}

randomlyGeneratingResource=function(){
	var x=Math.random()*575;
	var y=Math.random()*575;
	//var height=10;
	//var width=10;
	var id = Math.random();
	//var spdX=0;
	//var spdY=0;
	Resource(id,x,y);

}

var z;
for(z=80;z>0;z--){
	//875
	randomlyGeneratingResource();
}


ResourceLand = function (id,x,y)
{
	var aresourceLand={
		x:x,
		y:y,
		id:id,
		color:'Brown',

	};

	aresourceLand.update=function()
	{
		for (var i in Player.list)
		{
			var p=Player.list[i];
			if(testCollisionEntity(p,aresourceLand))
			{
				delete RESOURCE_LIST_LAND[aresourceLand.id];
				removePack.resourceland.push(aresourceLand.id);
				p.resourceLand++;
				
			}
				
		}
		
	}
	
	RESOURCE_LIST_LAND[aresourceLand.id]=aresourceLand;
	
	return aresourceLand;
}


randomlyGeneratingResourceLand=function(){
	var x=Math.random()*575;
	var y=Math.random()*575;
	//var height=10;
	//var width=10;
	var id = Math.random();
	//var spdX=0;
	//var spdY=0;
	ResourceLand(id,x,y);

}

var za;
for(za=80;za>0;za--){
	//875
	randomlyGeneratingResourceLand();
}










var Entity=function()
{
	var self={
		x:Math.random()*675,
		y:Math.random()*675,
		spdX:0,
		spdY:0,
		id:"",
	}
	self.update=function(){
		self.updatePosition();
	}
	self.updatePosition=function(){
		self.x+=self.spdX;
		self.y+=self.spdY;
	}

	return self;
}

var Bomb=function(x,y,parent,angle){

	var abomb={
		id:Math.random(),
		width:6,
		height:6,
		color:'black',

	};
	abomb.timer=0;
	abomb.y=y;
	abomb.x=x;
	abomb.parent=parent;
	abomb.toRemove=false;
	var super_update=abomb.update;
	abomb.update=function(){
		if(abomb.timer++>1000)
			abomb.toRemove=true;
		//super_update();

		for (var i in Player.list)
		{
			var p=Player.list[i];
			if(testCollisionEntity(p,abomb) &&abomb.parent !=p.id)
			{
				delete Bomb.list[abomb.id];
				removePack.bomb.push(abomb.id);
				p.resourceGold=0;
				p.resourceLand=0;
				p.resourceBombs=0;
				p.lose=true;
				p.getkickedout();


				//also player dies after2 landmines
			}
			
				
		}



	}
	abomb.getInitPack=function(){
		return{
			id:abomb.id,
			x:abomb.x,
			y:abomb.y,
			parent:abomb.parent,
			
		};
	}

	Bomb.list[abomb.id]=abomb;
	initPack.bomb.push({
		id:abomb.id,
		x:abomb.x,
		y:abomb.y,
		parent:abomb.parent,
	});
	return abomb;
}
Bomb.list={};


Bomb.update=function()
{
	var pack=[];
	for(var i in Bomb.list){
		var bomb =Bomb.list[i];
		bomb.update();
		if(bomb.toRemove)
		{
			delete Bomb.list[i];
			removePack.bomb.push(bomb.id);
		}
		else
		{
			pack.push({

			x:bomb.x,
			y:bomb.y,
			id:bomb.id,
			parent:bomb.parent,
			});
		}
			
	}
	return pack;
	
}
var timer=0;




var Player=function(id)
{
	var self=Entity();
	self.id=id;
	self.number=""+Math.floor(10*Math.random());
	self.colour=null;
	self.pressingRight=false;
	self.pressingLeft=false;
	self.pressingUp=false;
	self.pressingDown=false;
	self.pressingAttack=false;
	self.pressingMark=false;
	self.mouseAngle=0;
	self.maxspd=5;
	self.resourceGold=0;
	self.resourceLand=0;
	self.resourceBombs=0;
	self.lose=false;
	self.landcount=0;

	var super_update=self.update;
	self.update=function(){
		self.updateSpd();
		super_update();

		if(self.pressingMark)
		{

			
			self.markland(self.mouseAngle);
				
		}

		if(self.pressingAttack)
		{







	

			if(self.resourceBombs>=1)
			{
				var alandrightnow=null;

				for (i in Land.list)
				{
					if(testCollisionblackTile(self,Land.list[i]))
					{
						alandrightnow=Land.list[i];
						
						break;

					}
				}

				if(alandrightnow===null || alandrightnow.colour==='black')
				{
					//console.log('its working');
					self.pressingAttack=false;


				}
				else
				{
					self.plantbomb(self.mouseAngle);
					self.resourceBombs--;

					//console.log('its working  colour');
					
					self.pressingAttack=false;

				}
				



			}











			else
			{
				self.pressingAttack=false;

			}

				
		}
		
	}

	self.plantbomb=function(angle){

		var b =Bomb(self.x,self.y,self.id,angle);
		b.x=self.x;
		b.y=self.y;
		
		
		
	}
	self.markland=function(angle){
		//var l=Land(self.x,self.y,self.id,self.colour,angle);
		//self.landcount++;
		for(var w in Land.list)
		{
			var aland=Land.list[w];
			if(testCollisionTile(self,aland) && aland.parent !=self.id && aland.colour==='lightgrey' && self.resourceLand>0)
			{
				Land.list[aland.id].colour=self.colour;
				Land.list[aland.id].parent=self.id;
				self.landcount++;
				self.resourceLand--;
				
			}
		}

		
		
	}
	
	

	self.colme=function(acolour)
	{
		
		//var colpicker=Math.floor(10*Math.random());
		self.colour=acolour;
	}

	self.updateSpd=function()
	{
		if(self.pressingRight)
			self.spdX=self.maxspd;
		else if(self.pressingLeft)
			self.spdX= -self.maxspd;
		else
			self.spdX=0;

		if(self.pressingUp)
			self.spdY=-self.maxspd;
		else if(self.pressingDown)
			self.spdY=self.maxspd;
		else
			self.spdY=0;

		
	}

	self.getInitPack=function(){
		return{
			id:self.id,
			x:self.x,
			y:self.y,
			number:self.number,
			colour:self.colour,
			resourceGold:self.resourceGold,
			resourceLand:self.resourceLand,
			resourceBombs:self.resourceBombs,
			lose:self.lose,
			landcount:self.landcount,
		
		};
	}
	self.getUpdatePack=function(){
		return{
			id:player.id,
			x:player.x,
			y:player.y,
			resourceGold:player.resourceGold,
			resourceLand:player.resourceLand,
			resourceBombs:player.resourceBombs,
			lose:player.lose,
			landcount:self.landcount,
		};
	}
	self.getkickedout=function(){
		delete Player.list[self.id];
		removePack.player.push(self.id);
	}
	Player.list[id]=self;
	var rannum=Math.floor(Math.random()*10);
	self.colme(COLOUR_LIST[rannum]);
	COLOUR_LIST.splice(rannum,1);
	initPack.player.push(self.getInitPack());

	return self;
}

Player.list={};


Player.onConnect=function(socket)
{
	var player=Player(socket.id);
	
	socket.on('keyPress',function(data){
		if(data.inputId==='left')
			player.pressingLeft=data.state;
		else if(data.inputId==='right')
			player.pressingRight=data.state; 
		else if(data.inputId==='up')
			player.pressingUp=data.state; 
		else if(data.inputId==='down')
			player.pressingDown=data.state; 
		else if(data.inputId==='mark')
			player.pressingAttack=data.state; 
		else if(data.inputId==='mouseAngle')
			player.mouseAngle=data.state; 
		else if(data.inputId==='attack')
			player.pressingMark=data.state; 

	});

	socket.emit('init',{
		selfId:socket.id,
		player:Player.getAllInitPack(),
		bomb:Bomb.getAllInitPack(),
		land:Land.getAllInitPack(),
	});


}

Player.getAllInitPack=function(){
	var players=[];
	for(var i in Player.list)
		players.push(Player.list[i].getInitPack());
	return players;
}
Bomb.getAllInitPack=function(){
	var bombs=[];
	for(var i in Bomb.list)
		bombs.push(Bomb.list[i].getInitPack());
	return bombs;
}

Land.getAllInitPack=function(){
	var lands=[];
	for(var i in Land.list)
		lands.push(Land.list[i].getInitPack());
	return lands;
}
Player.onDisconnect=function(socket)
{
	for(var i in Land.list){
		if(Land.list[i].parent===socket.id){
			Land.list[i].colour='black'
		}
	}
	delete Player.list[socket.id];
	removePack.player.push(socket.id);

}

Player.update=function()
{
	var pack=[];
	for(var i in Player.list)
	{
		var player = Player.list[i];
		player.update();
		pack.push({
			x:player.x,
			y:player.y,
			id:player.id,
			//colour:player.colour,
			resourceGold:player.resourceGold,
			resourceLand:player.resourceLand,
			resourceBombs:player.resourceBombs,
			lose:player.lose,
			landcount:player.landcount,

		});
	}
	return pack;
}


Resource.update=function()
{
	var pack=[];
	for(var i in RESOURCE_LIST)
	{
		var aResource = RESOURCE_LIST[i];
		aResource.update();
		pack.push({
			x:aResource.x,
			//spdX:aResource.spdX,
			y:aResource.y,
			//spdY:aResource.spdY,
			//name:'R',
			id:aResource.id,
			//width:aResource.width,
			//height:aResource.height,
			color:'orange',
		});
	}
	return pack;
}


ResourceLand.update=function()
{
	var pack=[];
	for(var i in RESOURCE_LIST_LAND)
	{
		var aResourceLand = RESOURCE_LIST_LAND[i];
		aResourceLand.update();
		pack.push({
			x:aResourceLand.x,
			//spdX:aResource.spdX,
			y:aResourceLand.y,
			//spdY:aResource.spdY,
			//name:'R',
			id:aResourceLand.id,
			//width:aResource.width,
			//height:aResource.height,
			color:'Brown',
		});
	}
	return pack;
}


//COLLISION SYSTEM start

function getDistanceBetweenEntity(entity1,entity2){
	var vx= entity1.x - entity2.x;
	var vy= entity1.y - entity2.y;
	return Math.sqrt(vx*vx+vy*vy);
}

function getDistanceBetweentileplayer(entity1,entity2){
	var vx= (entity1.x -15)- entity2.x;
	var vy= (entity1.y -15 )-entity2.y;
	return Math.sqrt(vx*vx+vy*vy);
}

function testCollisionEntity(entity1,entity2){
	var distance = getDistanceBetweenEntity(entity1,entity2);
	return distance<15;
}
function testCollisionbricks(entity1,entity2){
	var distance = getDistanceBetweenEntity(entity1,entity2);
	return distance<24;
}

function testCollisionTile(entity1,entity2){
	var distance = getDistanceBetweentileplayer(entity1,entity2);
	return distance<11;
}
function testCollisionblackTile(entity1,entity2){
	var distance = getDistanceBetweentileplayer(entity1,entity2);
	return distance<17;
}

//COLLISION SYSTEM end

var USERS=['bob',
	'sarah',
	'mike',]
	


var isValidUsername=function(data){
	var answer=true;
	for(var i=0;i<USERS.length;i++)
	{
		if(data.username===USERS[i] || data.username==='')
			answer=false;
	}
	return answer;
}




var io=require('socket.io')(serv,{});
io.sockets.on('connection',function(socket)
{
	socket.id=Math.random();
	
	SOCKET_LIST[socket.id]=socket;

	socket.on('signIn',function(data){
		if(isValidUsername(data)){
			Player.onConnect(socket);
			socket.emit('signInResponse',{success:true});
			USERS.push(data.username);
		}
		else{
			socket.emit('signInResponse',{success:false});
		}
			
		
	});




	socket.on('disconnect',function(){
		delete SOCKET_LIST[socket.id];
		Player.onDisconnect(socket);
		
	});

	
	
});


var initPack = {player:[],resource:[],bomb:[],resourceland:[],};
var removePack={player:[],resource:[],bomb:[],resourceland:[],};



setInterval(function()
{
	var pack={player:Player.update(),resource:Resource.update(),bomb:Bomb.update(),land:Land.update(),resourceland:ResourceLand.update(),}
	var packprivate={resource:Resource.update(),land:Land.update(),resourceland:ResourceLand.update(),}  //land:Land.update(),

	timer++;

	

	for(var i in SOCKET_LIST)
	{
		var socket = SOCKET_LIST[i];
		socket.emit('initres',packprivate);
		socket.emit('update',pack);
		
		socket.emit('init',initPack);
		socket.emit('remove',removePack);

	}
	
	initPack.player=[];
	removePack.player=[];
	initPack.bomb=[];
	removePack.bomb=[];
	initPack.land=[];
	removePack.land=[];
	
	

	//initPack.resource=[];
	//removePack.resource=[];

	


},1000/25);// /25

/*var startProfiling=function(duration){
	profiler.startProfiling('1',true);
	setTimeout(function(){
		var profile1=profiler.stopProfiling('1');

		profile1.export(function(error,result){
			fs.writeFile('./profile.cpuprofile',result);
			profile1.delete();
			console.log("Profile saved.");
		});
	},duration);
}

startProfiling(40000);*/


var startProfiling=function(duration){
	var cpuProfiler = profiler.cpuProfiler;

	cpuProfiler.startProfiling('./profile.cpuprofile');                  // begin cpu profiling
	var cpuProfile = profiler.stopProfiling('./profile.cpuprofile') ;
	console.log("ok.");
}

//s//tartProfiling(40000);


