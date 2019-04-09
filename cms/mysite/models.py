# coding= utf-8

import datetime

from django.db import models
from django.utils import timezone
from django.views.generic.detail import DetailView
#from django import forms

class Question(models.Model):
    question_text = models.CharField(max_length=250)

    pub_date = models.DateTimeField('date published', default=timezone.now())

    ORDER_STATUS = ((1, 'Teste de Proficiência em Python3'), (2, 'Exercícios da Lista'), (12, 'Tutor'), (3, '1ª Semana'), (4, 'Demais Semanas'), 
        (5, 'Prova de ICC'), (6, 'Revisão de Provas'), (7, 'Trabalho de ICC'), (8, 'Relatório de ICC'), (9, 'Professor Coordenador'), 
        (10, 'Professor Aula Teórica'), (11, 'Professor Aula Prática'), (13, 'Questionário1'), (14, 'Questionário2'),
        (15, 'Questionário3'), (16, 'Questionário4'), (17, 'Questionário5'), (18, 'Questionário6'))
    ORDER_STATUS_DICT = dict((v, k) for k, v in ORDER_STATUS)

    test = models.PositiveSmallIntegerField(choices=ORDER_STATUS)

    #def __str__(self):
        #return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    choice_text = models.CharField(max_length=200)

    correct = models.BooleanField(default=None)

    #correct = forms.HiddenInput()

    #def __str__(self):
        #return self.choice_text
    def was_published_recently(self):
        return self.pub_date >= timezone.now() - datetime.timedelta(days=1)

def was_published_recently(self):
    now = timezone.now()
    return now - datetime.timedelta(days=1) <= self.pub_date <= now

def function(self):
    now = timezone.now()
    return now - datetime.timedelta(days=1) <= self.pub_date <= now


