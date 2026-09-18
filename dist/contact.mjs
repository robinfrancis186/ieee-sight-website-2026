export function emailDraft(name, topic, message) {
  if (!name.trim() || !message.trim()) throw new Error('Please enter your name and message.');
  const subjects=['Volunteering','College collaboration','Community partnership','General enquiry'];
  if (!subjects.includes(topic) || name.length>100 || message.length>2000) throw new Error('Please check your enquiry.');
  return 'mailto:ieeekerala.sight@gmail.com?subject='+encodeURIComponent('SIGHT Kerala · '+topic)+'&body='+encodeURIComponent(`Hello IEEE SIGHT Kerala team,\n\n${message.trim()}\n\n${name.trim()}`);
}
if(typeof document!=='undefined') document.querySelector('#enquiry-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget,status=document.querySelector('#draft-status');
  try {const data=new FormData(form); const draft=emailDraft(data.get('name'),data.get('topic'),data.get('message')); location.href=draft;status.textContent='Your email app was requested. Please review and send the draft there. If it didn’t open, email ieeekerala.sight@gmail.com directly.';}
  catch(error){status.textContent=error.message;}
});
