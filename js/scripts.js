$(() => {
	// Основной слайдер на главной
	$('.main_slider .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: false,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onTranslate: event => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: event => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	// Партнеры и поставщики
	$('.partners .slider').owlCarousel({
		loop: true,
		smartSpeed: 500,
		responsive: {
			0: {
				items: 2,
				margin: 20,
				nav: false,
				dots: true
			},
			480: {
				items: 3,
				margin: 20,
				nav: false,
				dots: true
			},
			768: {
				items: 4,
				margin: 20,
				nav: false,
				dots: true
			},
			1024: {
				items: 4,
				margin: 20,
				nav: true,
				dots: false
			},
			1280: {
				items: 5,
				margin: 20,
				nav: true,
				dots: false
			}
		}
	})


	// Галерея товара
	$('.product_gallery .slider').owlCarousel({
		loop: true,
		smartSpeed: 500,
		items: 3,
		margin: 20,
		autoWidth: true,
		responsive: {
			0: {
				nav: false,
				dots: true
			},
			480: {
				nav: false,
				dots: true
			},
			768: {
				nav: true,
				dots: false
			},
			1024: {
				nav: true,
				dots: false
			},
			1280: {
				nav: true,
				dots: false
			}
		}
	})


	// О компании - слайдер
	$('.about_block .slider').owlCarousel({
		items: 1,
		margin: 0,
		nav: false,
		dots: true,
		loop: true,
		smartSpeed: 750,
		autoplay: true,
		autoplayTimeout: 5000,
		onTranslate: event => {
			$(event.target).trigger('stop.owl.autoplay')
		},
		onTranslated: event => {
			$(event.target).trigger('play.owl.autoplay', [4250, 0])
		}
	})


	$('aside .cats .arr').click(function (e) {
		e.preventDefault()

		let cats = $(this).closest('.cats'),
			subCats = $(this).closest('.main').next()

		if ($(this).hasClass('active')) {
			$(this).removeClass('active')
			subCats.slideUp(300)
		} else {
			cats.find('.arr').removeClass('active')
			cats.find('.sub_cats').slideUp(300)

			$(this).addClass('active')
			subCats.slideDown(300)
		}
	})


	// Страница товара - Изображения товара
	$('.product_info .images .big .slider').owlCarousel({
		items: 1,
		margin: 0,
		loop: false,
		smartSpeed: 500,
		dots: false,
		nav: false,
		onTranslate: event => {
			let parent = $(event.target).closest('.images')

			parent.find('.thumbs button').removeClass('active')
			parent.find('.thumbs button:eq(' + event.item.index + ')').addClass('active')
		}
	})

	$('.product_info .images .thumbs button').click(function (e) {
		e.preventDefault()

		let parent = $(this).closest('.images')

		parent.find('.big .slider').trigger('to.owl.carousel', $(this).data('slide-index'))
	})


	// Отправка форм
	$('#checkout_modal .form').submit(function (e) {
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src: '#saccess_order_modal',
			type: 'inline',
			touch: false
		})
	})
})


$(window).on('load', () => {
	// Выравнивание элементов в сетке
	$('.steps .row').each(function () {
		stepHeight($(this), parseInt($(this).find('.step').length))
	})

	$('.cats_wall .row').each(function () {
		categoryHeight($(this), parseInt($(this).css('--categories_count')))
	})


	// Фикс. шапка
	headerInit = true,
		headerHeight = $('header').outerHeight()

	$('header:not(.absolute)').wrap('<div class="header_wrap"></div>')
	$('.header_wrap').height(headerHeight)

	headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})



$(window).resize(() => {
	// Выравнивание элементов в сетке
	$('.steps .row').each(function () {
		stepHeight($(this), parseInt($(this).find('.step').length))
	})

	$('.cats_wall .row').each(function () {
		categoryHeight($(this), parseInt($(this).css('--categories_count')))
	})


	// Фикс. шапка
	headerInit = false
	$('.header_wrap').height('auto')

	setTimeout(() => {
		headerInit = true
		headerHeight = $('header').outerHeight()

		$('.header_wrap').height(headerHeight)

		headerInit && $(window).scrollTop() > 0
			? $('header').addClass('fixed')
			: $('header').removeClass('fixed')
	}, 100)
})


$(window).scroll(() => {
	// Фикс. шапка
	typeof headerInit !== 'undefined' && headerInit && $(window).scrollTop() > 0
		? $('header').addClass('fixed')
		: $('header').removeClass('fixed')
})


// Выравнивание шагов
function stepHeight(context, step) {
	let start = 0,
		finish = step,
		$steps = context.find('.step')

	$steps.find('.name, .desc').height('auto')

	$steps.each(function () {
		setHeight($steps.slice(start, finish).find('.name'))
		setHeight($steps.slice(start, finish).find('.desc'))

		start = start + step
		finish = finish + step
	})
}


// Выравнивание категорий
function categoryHeight(context, step) {
	let start = 0,
		finish = step,
		$cats = context.find('.category')

	$cats.find('.main, .sub_cats').height('auto')

	$cats.each(function () {
		setHeight($cats.slice(start, finish).find('.main'))
		setHeight($cats.slice(start, finish).find('.sub_cats'))

		start = start + step
		finish = finish + step
	})
}