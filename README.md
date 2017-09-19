# About SliderAwesome
<b>SliderAwesome</b> is a quite awesome slider plugin full of various effects and styles that allows any customization. <br/>
<b>SliderAwesome</b>是一款颇为酷炫的可定制的附带多种效果且风格多样的轮播图插件。
<p>p.s. inspired by nivo-slider. 此插件灵感来自nivo-slider，是基于其部分轮播效果而做的一些改善，尝试加入了多种不同风格的效果。</p>
<p>目前已经集成了近30种轮滑效果，后期将会加入更多酷炫的元素，当然不乏3D的哦！</p>
<p>现已实现基本的轮播效果，相关的caption、indicators、theme等功能正在开发中，今后将会陆续更新。</p>

# View
<b>Default style</b>

<b>Random style</b>

<b>Some of effects</b>


# Usage


# Config
<b>html</b>
```
<div id="slider" class="sa sa-slider" style="margin:100px auto 0;">
    <ul class="slider-list">
        <li><img src="images/1.jpg" alt="" /></li>
        <li><img src="images/2.jpg" alt="" /></li>
        <li><img src="images/3.jpg" alt="" /></li>
        <li><img src="images/4.jpg" alt="" /></li>
    </ul>
</div>
```
<b>sliderAwesome.defaults</b>
```
$.fn.sliderAwesome.defaults = {
        effect: 'default',          // 默认效果
        slices: 15,                 // 切片数量
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
        preText: 'Pre',             // 后退按钮文本
        nextText: 'Next',           // 前进按钮文本
        randomStart: false,         // 是否随机选择轮播起始点
        styles:["flickrSlices", "flickrSlicesLeft" , "flickrSlicesRight" , "shutters" , "shuttersLeft" , "shuttersRight" , "fade" ,   
                "scroll" , "scrollLeft" , "scrollRight" , "shuffle" , "shuffleLeft" , "shuffleRight" , "takeOut" , "takeOutLeft" , 
                "takeOutRight" ,   "shuffleAndTakeOut" , "randomGrids" , "flickrWiderSlices" , "flickrWiderSlicesLeft" , 
                "flickrWiderSlicesRight" , "boxesRain" , "boxesRainLeft" , "boxesRainRight" , "flickrGridsUp" , "flickrGridsUpLeft" , 
                "flickrGridsUpRight" , "gridsShuffleUp" , "gridsShuffleUpLeft" , "gridsShuffleUpRight"]       // slider风格列表
};
```
The documentation will be presented in the next several days, in hopes of your waiting and thanks a lot ! <br/>
文档正在整理，将会在近期呈现，敬请期待！

More's coming soon ... <br/>
更多功能正在完善中 ...
