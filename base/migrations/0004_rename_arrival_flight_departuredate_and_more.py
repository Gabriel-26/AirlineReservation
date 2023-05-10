# Generated by Django 4.2 on 2023-05-10 12:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_rename_flights_flight_rename_users_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='flight',
            old_name='arrival',
            new_name='departureDate',
        ),
        migrations.RenameField(
            model_name='flight',
            old_name='fromAndTo',
            new_name='destination',
        ),
        migrations.RenameField(
            model_name='flight',
            old_name='departure',
            new_name='returnDate',
        ),
        migrations.RenameField(
            model_name='flight',
            old_name='price',
            new_name='totalAmount',
        ),
    ]
