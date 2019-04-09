from django import template
register = template.Library()

@register.filter
def percent(num1, num2):
	number = (num1*100)/num2
	return int(number)