# coding=utf-8

from django.http import HttpResponse, HttpResponseRedirect
from django.template import loader
from django.shortcuts import render
import datetime


def about(request):
	return HttpResponse('about')

def current_datetime(request):
    now = datetime.datetime.now()
    html = "<html><body>It is now %s.</body></html>" % now
    return HttpResponse(html)

def index(request):
    template = loader.get_template("polls/panel.html")
    return HttpResponse(template.render())




### Remove CSRF Token from page!
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
 
@login_required(redirect_field_name='next')
@never_cache
@csrf_exempt
###
def teste(request):
    ### Error 400 Bad Request
    if 'testnum' not in request.POST:
        from django.core.exceptions import SuspiciousOperation
        raise SuspiciousOperation("Invalid request; see documentation for correct paramaters")
    ###


    import sqlite3
    conn = sqlite3.connect('project.db')
    c = conn.cursor()


    c.execute('select MAX(grade) from mysite_attempt where user_id = '+ str(request.user.id) +' and test_id ='+ str(request.POST['testnum']))
    grade = c.fetchall()


    d = request.POST['testnum']

    c.execute('select question_text from mysite_question where test = '+ d)
    rows = c.fetchall()

    list = []
    for i in range(0,len(rows)):############
        list.append(*rows[i])



    c.execute('select id from mysite_question where test = '+ d)
    rows2 = c.fetchall()

    list2 = []
    for i in range(0,len(rows2)):############
        list2.append(*rows2[i])



    alllist = []
    listlen = []
    for i in list2:
        c.execute('select choice_text from mysite_choice where question_id = '+ str(i))
        rows3 = c.fetchall()

        list3 = []
        num = 0
        for i in range(0,len(rows3)):############
            list3.append(*rows3[i])
            num += 1
        alllist.append(list3)
        listlen.append(range(0,num))


    return render(request, 'teste.html', {'testnum': d,'quant': list, 'quantQuest': range(len(list)), 'e': list2, 'f': alllist, 'len': listlen, 'grade': grade[0][0]}) #int(*rows[0])})


### Remove CSRF Token from page!
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
 
@login_required(redirect_field_name='next')
@never_cache
@csrf_exempt
###
def send(request):
    ### Error 400 Bad Request
    if 'id' not in request.POST:
        from django.core.exceptions import SuspiciousOperation
        raise SuspiciousOperation("Invalid request; see documentation for correct paramaters")
    ###


    import sqlite3
    mydb = sqlite3.connect('project.db')
    mycursor = mydb.cursor()


    e = len(request.POST)

    identity = request.POST['id']
    test = request.POST['test']

    answers = "";



    j = sorted(request.POST.keys())
    grade = 0
    for x in range(0,e):
        if (j[x] != 'id') and (j[x] != 'test'):
            questionNbr = str(j[x][1:])

            if request.POST[j[x]] != '': # != Textarea
                answers += questionNbr+':'+request.POST[j[x]]


            if j[x][0] != 'c': #Textarea or not
                mycursor.execute('select correct from mysite_choice where question_id = '+ questionNbr)
                resp = mycursor.fetchall()

                if resp[int(request.POST[j[x]])-1][0] == 1:
                    grade += 1
                    answers += 'v'
                else:
                    answers += 'd'
            else:
                if request.POST[j[x]] != '': # != Textarea
                    #import sys # Python 2 decode
                    #reload(sys) # Python 2 decode
                    #sys.setdefaultencoding("utf-8") # Python 2 decode
                    answers += u"…"

    if answers != "":
        mycursor.execute("INSERT INTO mysite_attempt (attempt_text, grade, user_id, test_id) VALUES ('"+u"".join(answers).encode('utf-8').decode('utf-8')+"', '"+str(grade)+"', '"+str(identity)+"', '"+str(test)+"')")
#u' '.join((agent_contact, agent_telno)).encode('utf-8').strip()
        mydb.commit()



    return HttpResponseRedirect(request.path.replace('send/',''))

    #return render(request, 'send.html', {'quante': list, 'e': e,  'j': j, 'answers': answers, 'grade': grade, 'test': test, 'resp': resp, 'identity': identity, 'kn':questionNbr}) #int(*rows[0])})

