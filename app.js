var express = require('express')
var axios   = require('axios')
var cheerio = require('cheerio')


axios.get('http://www.liburnasional.com/kalender-2017/')
	.then(function(data){
		scrapCalendar.load(data.data)
	})
	.catch(function(err){
		console.log(err)
	})


const scrapCalendar = {
	structure: null,
	load: function(data){
		this.structure  = cheerio.load(data)
		this.parse()
	},
	parse: function(){
		this.parseEventNas()
	},
	parseEventNas: function(){
		const $ = this.structure

		let selector = $('.libnas-kalender-table')

		var data = []
		for(let i = 0; i <= selector.length; i++)
		{
			let t = selector.get(i)
			let tgl = {
				tgl : $(t).find('.libnas-calendar-holiday-datemonth').text(),
				day: $(t).find('.libnas-calendar-holiday-weekday').text() ,
				datetime: $(t).find('[datetime]').attr('datetime'),
				detail: $(t).find('[itemprop=summary]').text() 
			}

			data.push(tgl)
		}

		console.log(data)

	}

}

