
(function(){
  var form=document.getElementById('contactForm');
  var status=document.getElementById('formStatus');
  if(!form)return;
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var name=form.name.value.trim();
    var email=form.email.value.trim();
    var project=form.project.value.trim();
    var subject=form.subject.value.trim() || 'Website enquiry';
    var message=form.message.value.trim();

    var bodyLines=[
      'Name: '+name,
      'Email: '+email
    ];
    if(project){bodyLines.push('Project type: '+project)}
    bodyLines.push('');
    bodyLines.push(message);

    var mailto='mailto:sales@tsgroup.africa?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(bodyLines.join('\n'));
    window.location.href=mailto;

    if(status){
      status.textContent='Opening your email app to send this enquiry to sales@tsgroup.africa...';
    }
  });
})();
