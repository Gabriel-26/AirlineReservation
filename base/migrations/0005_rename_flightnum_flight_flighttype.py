# Generated by Django 4.2 on 2023-05-10 12:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_rename_arrival_flight_departuredate_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flight',
            old_name='flightNum',
            new_name='flightType',
        ),
    ]