# Generated by Django 4.2.11 on 2024-04-08 19:07

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('loc_id', models.AutoField(primary_key=True, serialize=False)),
                ('loc_name', models.CharField(max_length=100)),
                ('latitude', models.DecimalField(decimal_places=6, max_digits=9)),
                ('longitude', models.DecimalField(decimal_places=6, max_digits=10)),
                ('default_home', models.BooleanField(default=False)),
                ('default_dest', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='UserInfo',
            fields=[
                ('user_id', models.AutoField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=100, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('alarm_sound', models.CharField(max_length=100)),
                ('sched_reminder', models.BooleanField(default=True)),
                ('departure_time', models.BooleanField(default=True)),
                ('new_friends', models.BooleanField(default=True)),
                ('wake_up_aids_requests', models.BooleanField(default=True)),
                ('phone_number', models.CharField(max_length=24)),
                ('total_prep_time', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='UserAuth',
            fields=[
                ('email', models.EmailField(max_length=254)),
                ('password', models.CharField(max_length=100)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='app.userinfo')),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('event_id', models.AutoField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(max_length=100)),
                ('date', models.DateField()),
                ('start_time', models.TimeField()),
                ('end_time', models.TimeField()),
                ('transportation_mode', models.CharField(choices=[('car', 'Car'), ('motorcycle', 'Motorcycle'), ('bus', 'Bus'), ('metro', 'Metro'), ('walk', 'Walk')], max_length=20)),
                ('extra_prep_time', models.IntegerField()),
                ('note', models.TextField()),
                ('sched_destination', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_locations', to='app.location')),
                ('sched_start', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='start_locations', to='app.location')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='app.userinfo')),
                ('wake_up_aids', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='wake_up_friends', to='app.userinfo')),
            ],
        ),
        migrations.CreateModel(
            name='PrepActivityTime',
            fields=[
                ('prep_activity_name', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('prep_activity_time', models.IntegerField()),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='prep_activities', to='app.userinfo')),
            ],
        ),
        migrations.AddField(
            model_name='location',
            name='user_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='locations', to='app.userinfo'),
        ),
    ]
