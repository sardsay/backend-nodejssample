'use strict';
angular.module('app')
.controller('CreateContentController', function($scope, $http,$location) {

        
		var apiUrl = '/research-contents/';
		$scope.listMainCategory = function(){
			$http.get(apiUrl+'categoryList')
			.success(function(data){
				$scope.mainCategory = data;
			});
		}
		var subCateTheme = [];
		$scope.listSubCategory = function(cateid){
			$http.get(apiUrl+'subcategoryList/'+cateid)
			.success(function(data){				
				$scope.subCategory = data;
				$.each(data,function(index,value){
					subCateTheme[value._id] = value.theme;
				})
				$scope.content.subcategory = "";
			});
		}
		
		$scope.selCategory = function(cateid){			
			$scope.listSubCategory(cateid)
			$scope.category_id = cateid;

			for (var i = 1; i <= 11; i++) {
				$('#template'+i).hide();
			}

		}
		$scope.setDetail1 = function(){
			$scope.template3detail1 = $('#editor1').html();
		}
		$scope.setDetail2 = function(){
			$scope.template3detail2 = $('#editor2').html();
		}
		$scope.setDetail3 = function(){
			$scope.template3detail3 = $('#editor3').html();
		}
		
		var stockDatas = [];
		var stockDataArr = [];
		var stockIDArr = [];

		$http.get(apiUrl+'stockDataList')
			.success(function(data){
				$.each(data,function(index,value){
					
					stockIDArr[value.code] = value.stockid;
					stockDatas.push(value.code);
				})
				$scope.stockds = data;
				$scope.stockDatas = stockDatas;
				$scope.stockDatasArr = stockDataArr;
				$scope.stockIDArr = stockIDArr;
			});

		$scope.setTheme = function(subcateid){
			$scope.content.template = subCateTheme[subcateid];
			$scope.theme_id = subCateTheme[subcateid];
			$('.tab_contentEN').removeClass('active in');
            $('.tab_contentTH').addClass('active in');
			for (var i = 1; i <= 11; i++) {
				if (i == $scope.content.template) {
					$('#template'+i).show();
				}else{
					$('#template'+i).hide();
				}
			}
			
		}
		$scope.changeRecommend = function(selRecommend){
			switch(selRecommend){
				case '1':
					$('#recommend').show();
					$('#targetPrice').show();
					$('#neutral').hide();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
				break;
				case '2':
					$('#recommend').hide();
					$('#targetPrice').hide();
					$('#neutral').show();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
					break;
				default:
					$('#recommend').hide();
					$('#targetPrice').hide();
					$('#neutral').hide();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
					break;
			}
		}
		

		
})
.controller('EditContentController', function($scope, $http) {

	var apiUrl = '/research-contents/';

	$scope.listMainCategory = function(){
		$http.get(apiUrl+'categoryList')
		.success(function(data){
			
			$scope.mainCategory = data;
		});
	}
	var subCateTheme = [];
	$scope.listSubCategory = function(cateid){
		
		$http.get(apiUrl+'subcategoryList/'+cateid)
			.success(function(data){
				$scope.subCategory = data;
				$.each(data,function(index,value){
					subCateTheme[value._id] = value.theme;
				})
				
		});
	}
	var stockDatas = [];
	var stockDataArr = [];
	var stockIDArr = [];
	var stockCodeArr = [];

	$http.get(apiUrl+'stockDataList')
		.success(function(data){
			$.each(data,function(index,value){
				stockDataArr[value.code] = {
					name : value.name,
					stockid : value.stockid
				}
				stockCodeArr[value.stockid] = value.code;
				stockDatas.push(value.code);
			})
			$scope.stockDatas = stockDatas;
			
			$scope.stockDatasArr = stockDataArr;
			$scope.stockCodeArr = stockCodeArr;
			$scope.loadData()
		});
	$scope.selCategory = function(cateid){
		$scope.listSubCategory(cateid)
		$scope.category_id = cateid;
		for (var i = 1; i <= 11; i++) {
			$('#template'+i).hide();
		}
	}
	var id = $('#itemID').val();

	$scope.loadData = function() {
		var support1 = [];
		var resis1 = [];
		var support2 = [];
		var resis2 = [];
		var support3 = [];
		var resis3 = [];
		$http.post(apiUrl + 'read',{ id : id,_csrf : $('#_csrf').val()})
			.success(function(data){
				
				$('#template'+data.data.theme_id).show();
				
				$scope.data = data.data;
				support1 = data.data.support1;
				resis1 = data.data.resistance1;
				support2 = data.data.support2;
				resis2 = data.data.resistance2;
				support3 = data.data.support3;
				resis3 = data.data.resistance3;
					if(support1 != undefined ){
						var sub = support1.split("-");
						$scope.subport_spli1_1 = parseInt(sub[0]);
						$scope.subport_spli1_2 = parseInt(sub[1]);
						$scope.subport_spli1_3 = parseInt(sub[2]);
					}
					if(resis1 != undefined){
						var re = resis1.split("-");
						$scope.resis_spli1_1 = parseInt(re[0]);
						$scope.resis_spli1_2 = parseInt(re[1]);
						$scope.resis_spli1_3 = parseInt(re[2]);
					}
					if(support2 != undefined ){
						var sub = support2.split("-");
						$scope.subport_spli2_1 = parseInt(sub[0]);
						$scope.subport_spli2_2 = parseInt(sub[1]);
						$scope.subport_spli2_3 = parseInt(sub[2]);
					}
					if(resis2 != undefined){
						var re = resis2.split("-");
						$scope.resis_spli2_1 = parseInt(re[0]);
						$scope.resis_spli2_2 = parseInt(re[1]);
						$scope.resis_spli2_3 = parseInt(re[2]);
					}
					if(support3 != undefined ){
						var sub = support3.split("-");
						$scope.subport_spli3_1 = parseInt(sub[0]);
						$scope.subport_spli3_2 = parseInt(sub[1]);
						$scope.subport_spli3_3 = parseInt(sub[2]);
					}
					if(resis3 != undefined){
						var re = resis3.split("-");
						$scope.resis_spli3_1 = parseInt(re[0]);
						$scope.resis_spli3_2 = parseInt(re[1]);
						$scope.resis_spli3_3 = parseInt(re[2]);
					}
				$scope.listMainCategory();
				$scope.listSubCategory(data.data.categoryID)
				var date = new Date(data.data.datePublished)
				$scope.data.date_published = date.getFullYear() + '-' + pad((date.getMonth()+1)) + '-'+pad(date.getDate());
				$scope.data.time_published = date.getHours() + ':' + pad(date.getMinutes());
				if(data.data.theme_id == 1 || data.data.theme_id == 10){$scope.data.stockcode = $scope.stockCodeArr[data.data.stockID];}
				if(data.data.theme_id == 5){
					$scope.data.stockcode_1 = $scope.stockCodeArr[data.data.stockcode1];
					$scope.data.stockcode_2 = $scope.stockCodeArr[data.data.stockcode2];
					$scope.data.stockcode_3 = $scope.stockCodeArr[data.data.stockcode3];
				}
				
			})
	}
	$scope.setDetail1 = function(){
		$scope.template3detail1 = $('#editor1').html();
	}
	$scope.setDetail2 = function(){
		$scope.template3detail2 = $('#editor2').html();
	}
	$scope.setDetail3 = function(){
		$scope.template3detail3 = $('#editor3').html();
	}
		
		

		$scope.setTheme = function(subcateid){
			
			$scope.theme_id = subCateTheme[subcateid];
			$scope.subcategory_id = subcateid;
			$('.tab_contentEN').removeClass('active in');
            $('.tab_contentTH').addClass('active in');
			for (var i = 1; i <= 11; i++) {
				if (i == $scope.theme_id) {
					$('#template'+i).show();
				}else{
					$('#template'+i).hide();
				}
			}
			
		}
		$scope.changeRecommend = function(selRecommend){
			switch(selRecommend){
				case '1':
					$('#recommend').show();
					$('#targetPrice').show();
					$('#neutral').hide();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
				break;
				case '2':
					$('#recommend').hide();
					$('#targetPrice').hide();
					$('#neutral').show();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
					break;
				default:
					$('#recommend').hide();
					$('#targetPrice').hide();
					$('#neutral').hide();
					$('.tab_contentEN').removeClass('active in');
            		$('.tab_contentTH').addClass('active in');
					break;
			}
		}


	
	function pad(d) {
		return (d < 10) ? '0' + d.toString() : d.toString();
	}
})



