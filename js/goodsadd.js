var stock_price_data = new Object;

// 价钱 库存失去焦点
$(document).delegate('.stock_price_blur', 'blur', function() { 
    var stock_price_value = $(this).val();
    var stock_price_attr = $(this).attr('data_attr');
    if (stock_price_value == ''){
        return false;
    }
    var dataid = $(this).attr('dataid');
    //console.log(dataid);
    if (typeof(stock_price_data[dataid]) == "undefined"){
        var obj = new Object;
        if (stock_price_attr == 'price'){
            obj['price'] = stock_price_value;
            obj['stock'] = '';
        } else if (stock_price_attr == 'stock'){
            total_stock();
            obj['stock'] = stock_price_value;
            obj['price'] = '';
        }
        stock_price_data[dataid] = obj;
    } else {
        if (stock_price_attr == 'price'){
            stock_price_data[dataid]['price'] = stock_price_value;
        } else if (stock_price_attr == 'stock'){
            total_stock();
            stock_price_data[dataid]['stock'] = stock_price_value;
        }
    }
    //console.log(stock_price_data);
    return true;
});
//计算总库存
function total_stock(){
    var stockno = 0;
    $('input[name="brandcolor[]"]:checked').each(function () {
        var par_pc = $(this);
        $('input[name="brandmemory"]:checked').each(function () {
            var par_pm = $(this);
            var pre = par_pc.val()+'_'+par_pm.val();
            var stock = parseInt($('#stock_'+pre).val());
            if (isNaN(stock)){
                stock = 0;
            }
            stockno = stockno + stock; 
        });
    });
    $('#stock').val(stockno);
}
// 价格和库存渲染
$(document).delegate('.parameter_color,.parameter_memory', 'click', function() { 
    var par_c=new Array();
      var par_m = new Array();
     var par_c_obj = $('input[name="brandcolor[]"]:checked');
     var par_c_obj_no = par_c_obj.length;
     var par_m_obj = $('input[name="brandmemory"]:checked');
     var par_m_obj_no = par_m_obj.length;
    var str = ''; 
    $('input[name="brandcolor[]"]:checked').each(function () {
        var par_pc = $(this);
        var i=0;
        $('input[name="brandmemory"]:checked').each(function () {
            var par_pm = $(this);
            //console.log(par_pc.val(),par_pm.val());
            var key_index = par_pc.val()+'_'+par_pm.val();
            var value_price = '',value_stock = '';
            if (typeof(stock_price_data[key_index]) != "undefined") {
                value_price = stock_price_data[key_index]['price'];
                value_stock = stock_price_data[key_index]['stock'];
            }
            //console.log(par_pc.val(),par_pm.val());
            if (i == 0){
                str += '<tr><td rowspan="'+par_m_obj_no+'">'+par_pc.attr('datatext')+'</td><td>'+par_pm.attr('datatext')+'</td><td><input class="form-control stock_price_blur" data_attr="price" dataid = "'+par_pc.val()+'_'+par_pm.val()+'" id="price_'+par_pc.val()+'_'+par_pm.val()+'" value="'+value_price+'"/></td><td><input class="form-control stock_price_blur" data_attr="stock" dataid = "'+par_pc.val()+'_'+par_pm.val()+'" id="stock_'+par_pc.val()+'_'+par_pm.val()+'" value="'+value_stock+'"/></td></tr>';
            }else {
                str += '<tr><td>'+par_pm.attr('datatext')+'</td><td><input class="form-control stock_price_blur" data_attr="price" dataid = "'+par_pc.val()+'_'+par_pm.val()+'" id="price_'+par_pc.val()+'_'+par_pm.val()+'" value="'+value_price+'"/></td><td><input class="form-control stock_price_blur" data_attr="stock" dataid = "'+par_pc.val()+'_'+par_pm.val()+'" id="stock_'+par_pc.val()+'_'+par_pm.val()+'" value="'+value_stock+'"/></td></tr>';
            }
             i++;
            
        });
    }); 
    $('#parameter_info_tb').html(str);
    total_stock();
    return true;
});
