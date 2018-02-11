
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table=>{
        table.increments('id');
		table.string('username').unique();
		table.string('email');
        table.string('fullname');
        table.boolean('gender');
        table.date('birth');
        table.string('phone');
        table.string('photo');
        table.string('province');
        table.string('district');
        table.string('postal_code');
        table.string('address');
        table.string('password');
		table.timestamp('created_at').defaultTo(knex.fn.now());
		table.timestamp('updated_at').defaultTo(knex.fn.now());
   })
  	.then(function(){
  		console.log('Table Users Berhasil ditambahkan!');
  	});
};

exports.down = function(knex, Promise) {
    return knex.schema
  	.dropTable('users', table=>{
	  })
  	.then(function (){
  		console.log('Table Users Berhasil dihapus!');
  	});
};
