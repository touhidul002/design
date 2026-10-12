/* rev29 carousel (used by FUN/templates/rev29_picks.py). Safe to load in <head>; horizontal swipe works without it. */
(function () {
 function init() {
document.querySelectorAll('.rev29_featured').forEach(function(section) {
 const track=section.querySelector('.rev29_track');
 const prev=section.querySelector('.rev29_previous');
 const next=section.querySelector('.rev29_next');
 const dots=section.querySelectorAll('.rev29_dot');
 function update() {
  const max=track.scrollWidth-track.clientWidth;
  prev.disabled=track.scrollLeft<2;
  next.disabled=track.scrollLeft>=max-2;
  const index=max>0?Math.round(track.scrollLeft/max*(dots.length-1)):0;
  dots.forEach((dot,i)=>dot.classList.toggle('rev29_active',i===index));
 }
 function move(direction) {const card=track.querySelector('.rev29_pick');track.scrollBy({left:direction*card.getBoundingClientRect().width,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});}
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));
 track.addEventListener('scroll',update,{passive:true});
 track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();move(event.key==='ArrowRight'?1:-1);}});
 new ResizeObserver(update).observe(track);update();
});
 }
 if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
