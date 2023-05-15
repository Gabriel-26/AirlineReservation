from django.contrib.auth.models import User
from .models import RoundTripFlight, OneWayFlight, BookedOneWay, BookedRoundTrip
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.shortcuts import render, redirect, reverse
from django.contrib.auth.decorators import login_required

# from .forms import OneWayFlightForm


# Create your views here.
def Login(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        validateUser = authenticate(username=username, password=password) # this returns null or none if use does not exist



        if validateUser is not None:    
            login(request, validateUser) 
            if username == 'gabriel' and password == 'ilovecebu':
                return redirect('http://localhost:8000/admin')
            else:
                return redirect('http://localhost:8000/userhome')
        else:
            messages.error(request, 'wrong credentials please try again')
            # return redirect('login.html')

       
    return render(request, 'login.html')

def about(request):
    return render(request, 'about.html')


def service(request):
    return render(request, 'service.html')

    
def contact(request):
    return render(request, 'contact.html')

    
def register(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        getAllUser = User.objects.filter(username=username)
        getAllEmail = User.objects.filter(email=email)
        correctPass = 1
        correctUser = 1
        correctEmail = 1

        if len(password) < 6:
            messages.error(request, 'Password must be longer than 6 characters')
            correctPass = 0
            return redirect('register')
        

        if getAllUser:
            messages.error(request, 'Username already exist')
            correctUser = 0
            return redirect('register')
        
        if getAllEmail:
            messages.error(request, 'Email already Used')
            correctEmail = 0
            return redirect('register')

        if correctPass == 1 and correctUser == 1 and correctEmail == 1:
            newAccount = User.objects.create_user(username = username, email = email, password = password)
            newAccount.save()
            messages.success(request, 'User successfully Added')
            return redirect('home')

    return render(request, 'register.html')


def logOut(request): 
    logout(request)
    return render(request, 'index.html')



# def one_way_flights(request):
#     one_way_flights = OneWayFlight.objects.all()
#     return render(request, 'userhome.html', {'one_way_flights': one_way_flights})


# def round_trip_flights(request):
#     round_trip_flights = RoundTripFlight.objects.all()
#     return render(request, 'userhome.html', {'round_trip_flights': round_trip_flights})

def all_flights(request):
    one_way_flights = OneWayFlight.objects.all()
    round_trip_flights = RoundTripFlight.objects.all()
    return render(request, 'userhome.html', {'one_way_flights': one_way_flights, 'round_trip_flights': round_trip_flights})

@login_required
def book_flights(request):
    if request.method == 'POST':
        flight_id = request.POST.get('id')
        flightType = request.POST.get('flightType')
        if flight_id and flightType:
            if flightType == 'One-Way':
                flight = OneWayFlight.objects.get(id=flight_id)
                booked_flight = BookedOneWay(flightType=flight.flightType,
                                             destination=flight.destination,
                                             departureDate=flight.departureDate,
                                             totalAmount=flight.totalAmount,
                                            )
                booked_flight.save()
            elif flightType == 'Round-Trip':
                flight = RoundTripFlight.objects.get(id=flight_id)
                booked_flight = BookedRoundTrip(flightType=flight.flightType,
                                                destination=flight.destination,
                                                departureDate=flight.departureDate,
                                                returnDate=flight.returnDate,
                                                totalAmount=flight.totalAmount,
                                                )
                booked_flight.save()
            messages.success(request, 'Flight Successfully Booked')
    return redirect(request.META.get('HTTP_REFERER'))

@login_required
def confirmed_flights(request):
    booked_one_way = BookedOneWay.objects.all
    booked_round_trip = BookedRoundTrip.objects.all
    return render(request, 'bookedflights.html', {'booked_one_way': booked_one_way, 'booked_round_trip': booked_round_trip})

