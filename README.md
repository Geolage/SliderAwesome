# Get'em, get'em! SliderAwesome!

#### More Than Awesome!  专注于更佳、更强，致力于更酷、更全、更友好！

## About SliderAwesome
<b>SliderAwesome</b> is a quite awesome slider plugin full of various effects and styles that allows any customization. <br/>

<b>SliderAwesome</b> 是一款颇为酷炫的可定制的附带多种效果且风格多样的轮播图插件。

Thanks for nivo-slider giving me such good inspiration! 

感谢nivo-slider带来诸多很不错的灵感！

SliderAwesome这款插件吸收了其原有的轮播效果以及相关功能，在此基础上，加入了多种不同的风格元素，将会在相应的功能上获得更加良好的呈现效果，除此之外还对一些适应性内容进行了改善。

<p>目前已经集成了近30种轮滑效果，后期将会加入更多酷炫的元素，当然不乏3D的哦！</p>
<p>现已实现基本的轮播效果，相关的caption、indicators、theme以及更多功能正在开发中，今后将会陆续更新。</p>

<b>一些想说的话</b>

由于现在只有我一个人在开发此插件，并且也不可能总有空余的时间去投入，所以希望有更多的开发者们加入，共同改造。

目前手头上还有几个不错的轮播效果源码，但不多。如果您有不错的idea或者建议，烦请向我推荐哦！如果您不介意，就请加入进来一起开发吧！相信我们一定可以把这款插件开发得更加出色更加实用！

在此欢迎更多的coder帮助开发，让此类插件更好地发挥开源众包的良好特性，使其更加受益于每一位工作者！

## View

现在已经实现的轮播效果有很多，下面将会列举几种主要的styles，具体的风格请查阅下文config中defaults对象的styles列表。

<b>Default style</b>

![Default style](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/default.gif)

<b>Random style</b>

![Random style](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/random.gif)

<b>Main effects</b>

"flickrSlices"

![fs](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/fs.gif)

"flickrWiderSlices"

![fws](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/fws.gif)

"shutters"

![shuffle](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/shutters.gif)

"fade"

![fade](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/fade.gif)

"scroll"

![scroll](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/scroll.gif)

"shuffle"

![shuffle](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/shuffle.gif)

"takeOut"

![takeout](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/takeout.gif)

"shuffleAndTakeOut"

![sat](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/sat.gif)

"randomGrids"

![rg](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/rg.gif)

"boxesRain"

![br](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/br.gif)

"flickrGridsUp"

![fgu](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/fgu.gif)

"gridsShuffleUp"

![gsu](https://github.com/Geolage/SliderAwesome/blob/master/screenshots/gsu.gif)

其它效果暂时省略，但都是根据上述styles设计实现的，细化到了某一个方向上（如左或右），因此更具有可定制化。

除这些外，还有更多的轮播效果正在开发中，请留意后续更新。

## Compatibility
非常抱歉，目前只在Google Chrome上进行过测试，已经能够基本兼容。

鉴于开发尚且进展不错，待各项基本工作完成后将会进行更大程度的兼容性测试。


## Usage

<p><b>浏览器</b></p>

操作比较简单。首先在 html 中定义一个块元素并设置其id以告诉SliderAwesome将要渲染的区域。

```
<div id="slider" class="sa sa-slider">
    ...
</div>
```

接下来在内部放置一个ul列表，最好加上"slider-list"作为它的class，注意：此列表内必须含有你想要轮播的图片。

```
...
 <ul class="slider-list">                            
        <li><img src="images/1.jpg" alt="" /></li>   
        <li><img src="images/2.jpg" alt="" /></li>   
        <li><img src="images/3.jpg" alt="" /></li>   
        <li><img src="images/4.jpg" alt="" /></li>   
 </ul>
...

```

其次加入相关的标签，对 css 和 js 文件进行引用，请注意引入顺序。

在``<head>``里加入:

```
<link rel="stylesheet" href="SliderAwesome.css" type="text/css" /> 
```
在``<body>``里的最后面加入：
  
```
<script src="jquery.min.js"></script>  
<script src="SliderAwesome.jquery.1.0.0.js"></script>
```

完成引用后，在js入口文件（比如main.js）（不建议在html的 `<script>` ）中添加下列代码：

```
$(function(){
    $('#id').sliderAwesome({options});  // id即渲染slider的块元素id，options为个人配置，具体请参照 #Config 。
                                           e.g. $('#slider').sliderAwesome({effect:"random",delay:3000})
})
```

关于钩子函数"``` .sliderAwesome() ```"的参数 ```options``` 的使用建议：

``` effect: String || Array ``` 即effect后面可以选择String或者Array作为值的类型。

当轮播效果仅为一种时，建议直接用String类型的值。如：```{effect:"default"}```，设置后slider将以"default"风格来轮播图片；

当需要更多轮播效果时，可以使用Array类型的值。如：```{effect:["randomGrids","boxesRain"]}```，该配置表示slider将以"randomGrids"和"boxesRain"这两种风格随机轮播图片。<br />需要注意的是，当您使用此类型的值时，最好不要把"default"或是"random"放进列表中，否则将可能会导致slider不稳定。

完成这些初始化内容后，即可刷新页面查看效果。

Ahhha! 怎么样，是不是pretty simple, pretty cool呢？ Say Awesome!

## Config
<b>html</b>
```
<div id="slider" class="sa sa-slider">              // 定义slider显示区域
    <ul class="slider-list">                        // 定义轮播图列表
        <li><img src="images/1.jpg"></li>   |
        <li><img src="images/2.jpg"></li>   |       // slider列表
        <li><img src="images/3.jpg"></li>   |          图片子元素
        <li><img src="images/4.jpg"></li>   |
    </ul>
</div>
```
<b>sliderAwesome.defaults</b>
```
$.fn.sliderAwesome.defaults = {
        effect: 'default',          // 默认效果，值可为string或者array类型
        slices: 15,                 // 切片数量
        boxCols: 8,                 // 方块列数
        boxRows: 4,                 // 方块行数
        speed: 500,                 // 动画执行速度，ms为单位，数值越小速度越慢
        delay: 5000,                // 轮播图延迟时长，即下一轮播图的等待时间
        startSlide: 0,              // 开始播放的图片序号，以数组下标为准，0为起始点
        clickNav: true,             // 是否激活鼠标点击控制左右切换功能
        keyboardNav:false,          // 是否激活键盘左右键切换图片功能
        indicator: true,            // 是否开启当前图片标识器（一般为小圈圈）
        indicatorThumbs: false,     // 是否开启以标识器图片作为图标的功能
        pauseOnHover: true,         // 是否激活鼠标悬停暂停图片轮播的功能    
        preText: "Pre",             // 后退按钮文本
        nextText: "Next",           // 前进按钮文本
        randomStart: false,         // 是否随机选择轮播起始点
        styles:["flickrSlices", "flickrSlicesLeft" , "flickrSlicesRight" , "shutters" , "shuttersLeft" , "shuttersRight" , "fade" ,   
                "scroll" , "scrollLeft" , "scrollRight" , "shuffle" , "shuffleLeft" , "shuffleRight" , "takeOut" , "takeOutLeft" , 
                "takeOutRight" ,   "shuffleAndTakeOut" , "randomGrids" , "flickrWiderSlices" , "flickrWiderSlicesLeft" , 
                "flickrWiderSlicesRight" , "boxesRain" , "boxesRainLeft" , "boxesRainRight" , "flickrGridsUp" , "flickrGridsUpLeft" , 
                "flickrGridsUpRight" , "gridsShuffleUp" , "gridsShuffleUpLeft" , "gridsShuffleUpRight"]       // slider风格列表
};
```

#### More's coming soon ... <br/>更多功能正在完善中 ... 
