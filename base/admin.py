from django.contrib import admin
from .models import OneWayFlight,RoundTripFlight,BookedOneWay,BookedRoundTrip

admin.site.register(OneWayFlight)
admin.site.register(RoundTripFlight)
admin.site.register(BookedRoundTrip)
admin.site.register(BookedOneWay)
